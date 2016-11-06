// https://github.com/apollostack/graphql-server/issues/126#issuecomment-245833750
// eslint-disable-next-line no-use-before-define
module.exports.schema = () => [GroupType, UserType, BoatFromGroupType];

const UserType = require('./UserType').schema;
const BoatFromGroupType = require('./BoatFromGroupType').schema;

const groupController = require('../controllers/group');

const GroupType = `
  type Group {
    id: ID!
    name: String!
    is_club: Boolean!
    members: [User]!
    boats: [BoatFromGroup]!
  }
`;

const resolver = {
  id: group => group.get('id'),
  name: group => group.get('name'),
  is_club: group => group.get('is_club'),
  members: group => groupController.getMembers(group),
  boats: group => groupController.getBoats(group),
};
module.exports.resolver = resolver;
