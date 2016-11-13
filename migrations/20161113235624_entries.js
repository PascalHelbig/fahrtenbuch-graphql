exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('entries', (table) => {
      table.increments();
      table.string('text').notNullable();
      table.dateTime('start').notNullable();
      table.dateTime('end').notNullable();
      table.integer('sailed').notNullable();
      table.integer('motor').notNullable().defaultsTo(0);
      table.integer('creator').unsigned().notNullable().references('users.id');
      table.timestamps();
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('entries'),
  ]);
