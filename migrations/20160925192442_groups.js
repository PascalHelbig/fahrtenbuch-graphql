exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('groups', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.boolean('is_club').defaultTo(true).notNullable();
      table.timestamps();
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('groups'),
  ]);
