exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('name');
      table.string('email').unique();
      table.string('password');
      table.string('passwordResetToken');
      table.dateTime('passwordResetExpires');
      table.string('picture');
      table.string('facebook');
      table.string('google');
      table.timestamps();
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('users'),
  ]);
