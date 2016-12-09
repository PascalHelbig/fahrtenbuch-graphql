const UserType = require('./UserType').schema;
const ParticipationType = require('./ParticipationType').schema;

const EntryType = `
  type Entry {
    id: ID!
    text: String!
    start: String!
    end: String!
    sailed: Int!
    motor: Int!
    creator: User!
    participations: [Participation]
  }
`;

const resolver = {
  id: entry => entry.get('id'),
  text: entry => entry.get('text'),
  start: entry => entry.get('start'),
  end: entry => entry.get('end'),
  sailed: entry => entry.get('sailed'),
  motor: entry => entry.get('motor'),
  creator: entry => entry.related('creator').fetch(),
  participations: entry => entry.related('participations').fetch(),
};
module.exports.schema = () => [EntryType, UserType, ParticipationType];
module.exports.resolver = resolver;
