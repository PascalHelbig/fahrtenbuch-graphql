// https://github.com/apollostack/graphql-server/issues/126#issuecomment-245833750
// eslint-disable-next-line no-use-before-define
module.exports = () => [EntryType, UserType, ParticipationType];

const UserType = require('./../UserType').schema;
const ParticipationType = require('./../ParticipationType').schema;

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
