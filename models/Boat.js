const bookshelf = require('../config/bookshelf');
require('./Users');

const Boat = bookshelf.model('Boat', {
  tableName: 'boats',
  hasTimestamps: true,
  owner() {
    return this.morphTo('owner', 'User');
  },
});

module.exports = Boat;
