import * as migration_20261009_200857_initial from './20261009_200857_initial';
import * as migration_20261009_210629_vercel_blob_fields from './20261009_210629_vercel_blob_fields';

export const migrations = [
  {
    up: migration_20261009_200857_initial.up,
    down: migration_20261009_200857_initial.down,
    name: '20261009_200857_initial',
  },
  {
    up: migration_20261009_210629_vercel_blob_fields.up,
    down: migration_20261009_210629_vercel_blob_fields.down,
    name: '20261009_210629_vercel_blob_fields'
  },
];
