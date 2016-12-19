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

module.exports = () => [EntryType, UserType, ParticipationType];
