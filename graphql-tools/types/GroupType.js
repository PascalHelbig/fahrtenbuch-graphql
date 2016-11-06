const UserType = require('./UserType').schema;
const BoatType = require('./BoatType').schema;
const OwnerInterface = require('./../interfaces/OwnerInterface').schema;

const groupController = require('../../controllers/group');

const GroupType = `
  type Group implements Owner {
    id: ID!
    name: String!
    is_club: Boolean!
    members: [User]!
    boats: [Boat]!
  }
`;

const resolver = {
  id: group => group.get('id'),
  name: group => group.get('name'),
  is_club: group => group.get('is_club'),
  members: group => groupController.getMembers(group),
  boats: group => groupController.getBoats(group),
};
module.exports.schema = () => [GroupType, UserType, BoatType, OwnerInterface];
module.exports.resolver = resolver;
