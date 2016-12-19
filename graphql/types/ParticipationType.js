const UserType = require('./UserType').schema;
const BoatType = require('./BoatType/BoatType');

const ParticipationType = `
  type Participation {
    id: ID!
    user: User!
    boat: Boat!
    entry: Entry!
  }
`;

const resolver = {
  id: participation => participation.get('id'),
  user: participation => participation.related('user').fetch(),
  boat: participation => participation.related('boat').fetch(),
  entry: participation => participation.related('entry').fetch(),
};

module.exports.schema = () => [ParticipationType, UserType, BoatType];
module.exports.resolver = resolver;
