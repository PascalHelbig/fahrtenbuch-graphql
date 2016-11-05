const bookshelf = require('../config/bookshelf');
require('./Users');
require('./Group');

const Boat = bookshelf.model('Boat', {
  tableName: 'boats',
  hasTimestamps: true,
  owner() {
    return this.morphTo('owner', 'User', 'Group');
  },
});

module.exports = Boat;
