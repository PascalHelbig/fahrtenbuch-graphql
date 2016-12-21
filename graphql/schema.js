const { makeExecutableSchema } = require('graphql-tools');
const PublicGroupType = require('./types/PublicGroupType/PublicGroupType');
const LoggedInUserType = require('./types/LoggedInUserType/LoggedInUserType');
const GroupType = require('./types/GroupType/GroupType');
const GroupInput = require('./inputs/GroupInput').schema;
const BoatType = require('./types/BoatType/BoatType');
const BoatInput = require('./inputs/BoatInput').schema;
const EntryInput = require('./inputs/EntryInput').schema;
const ParticipationInput = require('./inputs/ParticipationInput').schema;
const EntryType = require('./types/EntryType/EntryType');
const LoginMutation = require('./mutations/LoginMutation');
const resolvers = require('./resolvers');

const Query = `
  type Query {
    groups: [PublicGroup]
    me(token: String!): LoggedInUser
  }
`;

const Mutation = `
  type Mutation {
    ${LoginMutation.schema}
    
    signup(
      email: Email!
      password: Password!
    ): Login
    
    addGroup(
      token: String!
      group: GroupInput!
    ): Group
    
    addUserBoat(
      token: String!
      boat: BoatInput!
    ): Boat
    
    addEntry(
      token: String!
      entry: EntryInput!
      participations: [ParticipationInput]!
    ): Entry
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, Mutation, PublicGroupType, LoggedInUserType,
    GroupInput, GroupType, BoatType, BoatInput, EntryInput,
    ParticipationInput, EntryType, LoginMutation.usedTypes],
  resolvers,
});
