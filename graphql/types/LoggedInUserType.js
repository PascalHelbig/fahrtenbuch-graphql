const GroupType = require('./GroupType').schema;
const BoatType = require('./BoatType').schema;
const userController = require('../../controllers/user');

const LoggedInUserType = `
  type LoggedInUser {
    user: User!
    email: String!
    groups: [Group]!
    boats: [Boat]!
    availableBoats: [Boat]!
  }
`;

const resolver = {
  user: user => user,
  email: user => user.get('email'),
  groups: user => userController.getGroups(user),
  boats: user => userController.getBoats(user),
  availableBoats: user => user.availableBoats(),
};

module.exports.schema = () => [LoggedInUserType, GroupType, BoatType];
module.exports.resolver = resolver;
