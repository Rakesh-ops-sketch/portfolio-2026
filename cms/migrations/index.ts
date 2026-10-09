import * as migration_20261009_200857_initial from './20261009_200857_initial';

export const migrations = [
  {
    up: migration_20261009_200857_initial.up,
    down: migration_20261009_200857_initial.down,
    name: '20261009_200857_initial'
  },
];
