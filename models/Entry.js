const bookshelf = require('../config/bookshelf');
require('./User');
require('./Participation');

const Entry = bookshelf.model('Entry', {
  tableName: 'entries',
  hasTimestamps: true,
  creator() {
    return this.belongsTo('User', 'creator');
  },
  participations() {
    return this.hasMany('Participation');
  },
});

module.exports = Entry;
