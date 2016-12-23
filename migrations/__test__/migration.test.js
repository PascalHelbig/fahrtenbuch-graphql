const SQLITE_FILE_PATH = 'migrations/__test__/testDb.sqlite';

const fs = require('fs');
const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: SQLITE_FILE_PATH },
});

beforeAll(() => {
  if (fs.existsSync(SQLITE_FILE_PATH)) {
    fs.unlinkSync(SQLITE_FILE_PATH);
  }
});

it('should migrate', () =>
  knex.migrate.latest().finally(() =>
    knex.destroy()
  )
);
