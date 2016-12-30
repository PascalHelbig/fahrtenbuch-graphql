const GroupType = require('../GroupType/GroupType');
const BoatType = require('../BoatType/BoatType');
const ParticipationType = require('../ParticipationType/ParticipationType');
const MembershipType = require('../MembershipType/MembershipType');

const LoggedInUserType = `
  type LoggedInUser {
    user: User!
    email: String!
    boats: [Boat]!
    availableBoats: [Boat]!
    participations: [Participation]
    memberships: [Membership]
  }
`;

module.exports = () => [LoggedInUserType, GroupType, BoatType, ParticipationType, MembershipType];
