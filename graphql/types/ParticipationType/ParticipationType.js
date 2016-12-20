// https://github.com/apollostack/graphql-server/issues/126#issuecomment-245833750
// eslint-disable-next-line no-use-before-define
module.exports = () => [ParticipationType, UserType, BoatType, EntryType];

const UserType = require('./../UserType').schema;
const BoatType = require('./../BoatType/BoatType');
const EntryType = require('./../EntryType/EntryType');

const ParticipationType = `
  type Participation {
    id: ID!
    user: User!
    boat: Boat!
    entry: Entry!
  }
`;
