const User = require('../../../models/User');
const Group = require('../../../models/Group');

module.exports = {
  user: membership => new User({ id: membership.pivot.get('user_id') }).fetch(),
  group: membership => new Group({ id: membership.pivot.get('group_id') }).fetch(),
  is_admin: membership => membership.pivot.get('is_admin'),
};
