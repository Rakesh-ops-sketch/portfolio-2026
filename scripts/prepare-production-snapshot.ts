import { createCipheriv, createHash, randomBytes } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { PGlite } from '@electric-sql/pglite';

await mkdir('.vercel', { recursive: true });
let secret: string;
try { secret = await readFile('.vercel/cms-secret', 'utf8'); }
catch { secret = randomBytes(32).toString('hex'); await writeFile('.vercel/cms-secret', secret, { mode: 0o600 }); }
const db = await PGlite.create('.cms-local/db');
try {
  const available = await db.query<{ table_name: string }>("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name");
  const remaining = new Set(available.rows.map(row => row.table_name).filter(name => !name.startsWith('payload_') && name !== 'users_sessions'));
  const dependencies = await db.query<{ table_name: string; referenced_table: string }>("SELECT DISTINCT tc.table_name, ccu.table_name AS referenced_table FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name AND ccu.constraint_schema = tc.constraint_schema WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'");
  const tables = [];
  while (remaining.size) {
    const name = [...remaining].find(candidate => !dependencies.rows.some(row => row.table_name === candidate && row.referenced_table !== candidate && remaining.has(row.referenced_table)));
    if (!name) throw new Error('Snapshot contains circular table dependencies.');
    const columns = await db.query<{ column_name: string }>("SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 AND data_type IN ('json', 'jsonb')", [name]);
    const rows = (await db.query<Record<string, unknown>>(`SELECT * FROM "${name}" ORDER BY id`)).rows;
    if (name === 'users') for (const row of rows) {
      row.reset_password_token = null; row.reset_password_expiration = null;
      row.login_attempts = 0; row.lock_until = null;
    }
    tables.push({ name, jsonColumns: columns.rows.map(row => row.column_name), rows });
    remaining.delete(name);
  }
  const plaintext = Buffer.from(JSON.stringify({ tables }));
  const nonce = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', createHash('sha256').update(secret).digest(), nonce);
  const encrypted = Buffer.concat([cipher.update(gzipSync(plaintext)), cipher.final()]);
  const encoded = Buffer.concat([nonce, cipher.getAuthTag(), encrypted]).toString('base64');
  if (encoded.length > 45000) throw new Error('Snapshot exceeds the one-time environment transfer limit.');
  await writeFile('.vercel/cms-snapshot', encoded, { mode: 0o600 });
  console.log(`Prepared encrypted CMS snapshot (${tables.length} tables, ${encoded.length} bytes). Account sessions and password-reset tokens were excluded.`);
} finally { await db.close(); }
