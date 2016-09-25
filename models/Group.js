const bookshelf = require('../config/bookshelf');
require('./Users');
require('./Boat');

module.exports = bookshelf.model('Group', {
  tableName: 'groups',
  hasTimestamps: true,
  members() {
    return this.belongsToMany('User', 'memberships').withPivot(['is_admin']);
  },
  boats() {
    return this.morphMany('Boat', 'owner');
  },
});
