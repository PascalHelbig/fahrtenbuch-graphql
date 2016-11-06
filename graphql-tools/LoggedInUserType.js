const GroupType = require('./GroupType').schema;
const BoatType = require('./BoatType').schema;
const userController = require('../controllers/user');

const LoggedInUserType = `
  type LoggedInUser {
    id: ID!
    email: String!
    name: String
    groups: [Group]!
    boats: [Boat]!
    availableBoats: [Boat]!
  }
`;

const resolver = {
  id: user => user.get('id'),
  email: user => user.get('email'),
  name: user => user.get('name'),
  groups: user => userController.getGroups(user),
  boats: user => userController.getBoats(user),
  availableBoats: user => user.availableBoats(),
};

module.exports.schema = () => [LoggedInUserType, GroupType, BoatType];
module.exports.resolver = resolver;
