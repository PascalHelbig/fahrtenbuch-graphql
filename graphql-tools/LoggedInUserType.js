const GroupType = require('./GroupType').schema;
const userController = require('../controllers/user');

const LoggedInUserType = `
  type LoggedInUser {
    id: ID!
    email: String!
    name: String
    groups: [Group]!
  }
`;

const resolver = {
  id: user => user.get('id'),
  email: user => user.get('email'),
  name: user => user.get('name'),
  groups: user => userController.getGroups(user),
};

module.exports.schema = () => [LoggedInUserType, GroupType];
module.exports.resolver = resolver;
