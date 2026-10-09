import test from 'node:test';
import assert from 'node:assert/strict';
import { createCipheriv, createHash, randomBytes } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';

test('production bootstrap preserves IDs, JSON, draft history and sequences and safely resumes', { timeout: 120000 }, async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'portfolio-bootstrap-test-'));
  const db = await PGlite.create();
  const server = new PGLiteSocketServer({ db, path: path.join(root, '.s.PGSQL.5432'), maxConnections: 10 });
  const secret = 'disposable-bootstrap-test-secret';
  const snapshot = { tables: [
    { name: 'users', jsonColumns: [], rows: [{ id: 7, name: 'Owner', email: 'owner@example.test', salt: 'fixture-salt', hash: 'fixture-hash' }] },
    { name: 'media', jsonColumns: [], rows: [{ id: 4, alt: 'Public image', url: 'https://fixture.public.blob.vercel-storage.com/image.png' }] },
    { name: 'pages', jsonColumns: ['sections'], rows: [{ id: 3, title: 'Owner edited page', slug: 'home', _status: 'published', seo_image_id: 4, sections: [{ blockType: 'hero', heading: 'Local content' }] }] },
    { name: '_pages_v', jsonColumns: ['version_sections'], rows: [{ id: 11, parent_id: 3, version_title: 'Private draft', version_slug: 'home', version__status: 'draft', version_sections: [{ blockType: 'hero', heading: 'Unpublished' }], latest: true }] },
  ] };
  function encrypt(value: unknown) {
    const nonce = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', createHash('sha256').update(secret).digest(), nonce);
    const bytes = Buffer.concat([cipher.update(gzipSync(Buffer.from(JSON.stringify(value)))), cipher.final()]);
    return Buffer.concat([nonce, cipher.getAuthTag(), bytes]).toString('base64');
  }
  async function run(value: unknown) {
    return new Promise<{ code: number | null; output: string }>((resolve, reject) => {
      const child = spawn(process.execPath, ['--import', 'tsx', 'scripts/bootstrap-production.ts'], { env: { ...process.env, NODE_ENV: 'test', DATABASE_URL: `postgresql://postgres:postgres@localhost/postgres?host=${encodeURIComponent(root)}`, PAYLOAD_SECRET: secret, BLOB_READ_WRITE_TOKEN: 'vercel_blob_rw_fixture_disposable', CMS_BOOTSTRAP_SNAPSHOT: encrypt(value) }, stdio: ['ignore', 'pipe', 'pipe'] });
      let output = '';
      child.stdout.on('data', chunk => { output += chunk; });
      child.stderr.on('data', chunk => { output += chunk; });
      child.on('error', reject);
      child.on('exit', code => resolve({ code, output }));
    });
  }
  try {
    await server.start();
    const first = await run(snapshot);
    assert.equal(first.code, 0, first.output);
    assert.equal((await db.query<{ title: string }>('SELECT title FROM pages WHERE id = 3')).rows[0].title, 'Owner edited page');
    assert.deepEqual((await db.query<{ sections: unknown }>('SELECT sections FROM pages WHERE id = 3')).rows[0].sections, [{ blockType: 'hero', heading: 'Local content' }]);
    assert.equal((await db.query<{ version_title: string }>('SELECT version_title FROM _pages_v WHERE parent_id = 3')).rows[0].version_title, 'Private draft');
    assert.equal((await db.query<{ nextval: number }>("SELECT nextval('users_id_seq')")).rows[0].nextval, 8);
    const again = await run(snapshot);
    assert.equal(again.code, 0, again.output);
    assert.equal((await db.query<{ count: number }>('SELECT count(*) FROM users')).rows[0].count, 1);
    const other = await run({ tables: [] });
    assert.notEqual(other.code, 0);
    assert.match(other.output, /different snapshot/);
  } finally {
    await server.stop();
    // Socket detach handlers complete on the next event-loop turns.
    await new Promise(resolve => setTimeout(resolve, 100));
    await db.close();
    await rm(root, { recursive: true, force: true });
  }
});
