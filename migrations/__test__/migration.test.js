const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: ':memory:' },
});

it('should migrate', () =>
  knex.migrate.latest().finally(() =>
    knex.destroy()
  )
);
