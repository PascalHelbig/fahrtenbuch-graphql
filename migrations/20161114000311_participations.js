exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('participations', (table) => {
      table.increments();
      table.integer('user_id').unsigned().notNullable().references('users.id');
      table.integer('entry_id').unsigned().notNullable().references('entries.id');
      table.integer('boat_id').unsigned().notNullable().references('boats.id');
      table.unique(['user_id', 'entry_id']);
      table.timestamps();
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('participations'),
  ]);
