exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('boats', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.integer('owner_id').unsigned().notNullable();
      table.string('owner_type').notNullable();
      table.timestamps();
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('boats'),
  ]);
