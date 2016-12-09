const bookshelf = require('../config/bookshelf');
require('./User');
require('./Entry');
require('./Boat');

const Participation = bookshelf.model('Participation', {
  tableName: 'participations',
  hasTimestamps: true,
  user() {
    return this.belongsTo('User');
  },
  entry() {
    return this.belongsTo('Entry');
  },
  boat() {
    return this.belongsTo('Boat');
  },
});

module.exports = Participation;
