const GroupType = require('./GroupType').schema;
const BoatFromUserType = require('./BoatFromUserType').schema;
const userController = require('../controllers/user');

const LoggedInUserType = `
  type LoggedInUser {
    id: ID!
    email: String!
    name: String
    groups: [Group]!
    boats: [BoatFromUser]!
  }
`;

const resolver = {
  id: user => user.get('id'),
  email: user => user.get('email'),
  name: user => user.get('name'),
  groups: user => userController.getGroups(user),
  boats: user => userController.getBoats(user),
};

module.exports.schema = () => [LoggedInUserType, GroupType, BoatFromUserType];
module.exports.resolver = resolver;
