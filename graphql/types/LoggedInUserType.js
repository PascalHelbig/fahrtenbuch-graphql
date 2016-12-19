const GroupType = require('./GroupType').schema;
const BoatType = require('./BoatType/BoatType');
const ParticipationType = require('./ParticipationType').schema;
const userController = require('../../controllers/user');

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

const resolver = {
  user: user => user,
  email: user => user.get('email'),
  groups: user => userController.getGroups(user),
  boats: user => userController.getBoats(user),
  availableBoats: user => user.availableBoats(),
  participations: user => user.related('participations').fetch(),
};

module.exports.schema = () => [LoggedInUserType, GroupType, BoatType, ParticipationType];
module.exports.resolver = resolver;
