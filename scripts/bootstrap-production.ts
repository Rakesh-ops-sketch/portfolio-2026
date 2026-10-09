import { createDecipheriv, createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import path from 'node:path';
import { getPayload } from 'payload';
import config from '../payload.config';
import { closePayload } from './close-payload';

type Snapshot = { tables: { name: string; jsonColumns: string[]; rows: Record<string, unknown>[] }[] };
const quote = (name: string) => `"${name.replaceAll('"', '""')}"`;

/** One-time launch command. Never called by the normal build or app runtime. */
async function bootstrap() {
  const encoded = process.env.CMS_BOOTSTRAP_SNAPSHOT;
  const secret = process.env.PAYLOAD_SECRET;
  if (!encoded || !secret || !process.env.DATABASE_URL || !process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Production bootstrap requires the encrypted snapshot and production CMS credentials.');
  }
  const bytes = Buffer.from(encoded, 'base64');
  const decipher = createDecipheriv('aes-256-gcm', createHash('sha256').update(secret).digest(), bytes.subarray(0, 12));
  decipher.setAuthTag(bytes.subarray(12, 28));
  const plaintext = gunzipSync(Buffer.concat([decipher.update(bytes.subarray(28)), decipher.final()]));
  const fingerprint = createHash('sha256').update(plaintext).digest('hex');
  const snapshot: Snapshot = JSON.parse(plaintext.toString());
  const payload = await getPayload({ config });
  try {
    await payload.db.migrate();
    const client = await payload.db.pool.connect();
    try {
      const marker = await client.query('SELECT data FROM payload_kv WHERE key = $1', ['cms-production-bootstrap']);
      if (marker.rows.length) {
        if (marker.rows[0].data !== fingerprint) throw new Error('This database was initialized from a different snapshot.');
        console.log('Production snapshot already imported.');
      } else {
        const populated = await client.query('SELECT (SELECT count(*) FROM users) + (SELECT count(*) FROM pages) + (SELECT count(*) FROM media) AS count');
        if (Number(populated.rows[0].count)) throw new Error('Refusing to import over an existing production CMS.');
        await client.query('BEGIN');
        try {
          for (const table of snapshot.tables) {
            if (!/^[_a-z][a-z0-9_]*$/.test(table.name) || table.name.startsWith('payload_') || table.name === 'users_sessions') throw new Error('Invalid snapshot table.');
            for (const row of table.rows) {
              const columns = Object.keys(row);
              const values = columns.map(key => table.jsonColumns.includes(key) && row[key] !== null ? JSON.stringify(row[key]) : row[key]);
              await client.query(`INSERT INTO ${quote(table.name)} (${columns.map(quote).join(',')}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(',')})`, values);
            }
            const serial = await client.query('SELECT pg_get_serial_sequence($1, $2) AS sequence', [table.name, 'id']);
            if (serial.rows[0].sequence && table.rows.length) {
              await client.query(`SELECT setval($1::regclass, (SELECT max(id) FROM ${quote(table.name)}), true)`, [serial.rows[0].sequence]);
            }
          }
          await client.query('INSERT INTO payload_kv (key, data) VALUES ($1, $2::jsonb)', ['cms-production-bootstrap', JSON.stringify(fingerprint)]);
          await client.query('COMMIT');
          console.log('Imported local content, drafts, versions, and owner account.');
        } catch (error) {
          await client.query('ROLLBACK');
          throw error;
        }
      }
    } finally { client.release(); }

    // Read stored URLs directly: the Blob adapter can rewrite URLs during reads
    // before a local image has actually been uploaded to the new store.
    const media = await payload.db.pool.query<{ id: number; alt: string; url: string | null; source_path: string | null }>('SELECT id, alt, url, source_path FROM media ORDER BY id');
    for (const image of media.rows) {
      if (image.url?.includes('.public.blob.vercel-storage.com/')) continue;
      if (!image.source_path?.startsWith('/') || image.source_path.includes('..')) throw new Error('Media needs a valid repository source path.');
      await payload.update({ collection: 'media', id: image.id, data: { alt: image.alt }, filePath: path.join(process.cwd(), 'public', image.source_path), overrideAccess: true, context: { skipRevalidation: true } });
      console.log(`Uploaded media ${image.id} to production storage.`);
    }
    await payload.db.pool.query('INSERT INTO payload_kv (key, data) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data', ['cms-production-bootstrap', JSON.stringify(fingerprint)]);
    console.log('Production CMS initialized.');
  } finally { await closePayload(payload); }
}

await bootstrap();
