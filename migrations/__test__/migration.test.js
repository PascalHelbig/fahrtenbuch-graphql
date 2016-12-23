require('dotenv').config();
const config = require('../../knexfile');
const knex = require('knex')(config);

it('should migrate', () =>
  knex.migrate.latest().finally(() =>
    knex.destroy()
  )
);
