// https://github.com/apollostack/graphql-server/issues/126#issuecomment-245833750
// eslint-disable-next-line no-use-before-define
module.exports.schema = () => [ParticipationType, UserType, BoatType, EntryType];

const UserType = require('./UserType').schema;
const BoatType = require('./BoatType/BoatType');
const EntryType = require('./EntryType/EntryType');

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

module.exports.resolver = resolver;
