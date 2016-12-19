const GroupType = require('./../GroupType/GroupType');
const BoatType = require('./../BoatType/BoatType');
const ParticipationType = require('./../ParticipationType').schema;

const LoggedInUserType = `
  type LoggedInUser {
    user: User!
    email: String!
    groups: [Group]!
    boats: [Boat]!
    availableBoats: [Boat]!
    participations: [Participation]
  }
`;

module.exports = () => [LoggedInUserType, GroupType, BoatType, ParticipationType];
