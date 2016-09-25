exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('memberships', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.integer('group_id').notNullable().unsigned().references('groups.id');
      table.boolean('is_admin').notNullable().defaultTo(false);
      table.timestamps();
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('memberships'),
  ]);
