exports.seed = knex =>
  knex('users').insert({ id: 1234, name: 'user 1234' })
    .then(() =>
      knex('boats').insert({ id: 1235, name: 'boat 1235', owner_id: 1234, owner_type: 'users' })
    );
