const UserType = require('../UserType/UserType');
const BoatType = require('../BoatType/BoatType');
const OwnerInterface = require('../../interfaces/OwnerInterface').schema;

const GroupType = `
  type Group implements Owner {
    id: ID!
    name: String!
    is_club: Boolean!
    members: [User]!
    boats: [Boat]!
  }
`;

module.exports = () => [GroupType, UserType, BoatType, OwnerInterface];
