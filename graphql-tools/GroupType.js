const UserType = require('./UserType').schema;
const groupController = require('../controllers/group');

const GroupType = `
  type Group {
    id: ID!
    name: String!
    is_club: Boolean!
    members: [User]!
  }
`;

const resolver = {
  id: group => group.get('id'),
  name: group => group.get('name'),
  is_club: group => group.get('is_club'),
  members: group => groupController.getMembers(group),
};

module.exports.schema = () => [GroupType, UserType];
module.exports.resolver = resolver;
