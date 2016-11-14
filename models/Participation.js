const bookshelf = require('../config/bookshelf');
require('./User');
require('./Entry');
require('./Boat');

const Participation = bookshelf.model('Participation', {
  tableName: 'participations',
  hasTimestamps: true,
  user() {
    return this.hasOne('user');
  },
  entry() {
    return this.hasOne('entry');
  },
  boat() {
    return this.hasOne('boat');
  },
});

module.exports = Participation;
