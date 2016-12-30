// https://github.com/apollostack/graphql-server/issues/126#issuecomment-245833750
// eslint-disable-next-line no-use-before-define
module.exports = () => [GroupType, BoatType, OwnerInterface, MembershipType];

const BoatType = require('../BoatType/BoatType');
const MembershipType = require('../MembershipType/MembershipType');
const OwnerInterface = require('../../interfaces/OwnerInterface').schema;

const GroupType = `
  type Group implements Owner {
    id: ID!
    name: String!
    is_club: Boolean!
    boats: [Boat]!
    memberships: [Membership]
  }
`;
