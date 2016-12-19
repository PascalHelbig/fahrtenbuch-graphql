const userController = require('../../../controllers/user');

module.exports = {
  user: user => user,
  email: user => user.get('email'),
  groups: user => userController.getGroups(user),
  boats: user => userController.getBoats(user),
  availableBoats: user => user.availableBoats(),
  participations: user => user.related('participations').fetch(),
};
