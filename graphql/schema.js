const { makeExecutableSchema } = require('graphql-tools');
const PublicGroupType = require('./types/PublicGroupType/PublicGroupType');
const LoginType = require('./types/LoginType').schema;
const LoggedInUserType = require('./types/LoggedInUserType').schema;
const PasswordScalar = require('./scalars/PasswordScalar').schema;
const EmailScalar = require('./scalars/EmailScalar').schema;
const GroupType = require('./types/GroupType').schema;
const GroupInput = require('./inputs/GroupInput').schema;
const BoatType = require('./types/BoatType').schema;
const BoatInput = require('./inputs/BoatInput').schema;
const EntryInput = require('./inputs/EntryInput').schema;
const ParticipationInput = require('./inputs/ParticipationInput').schema;
const EntryType = require('./types/EntryType').schema;
const resolvers = require('./resolvers');

const Query = `
  type Query {
    groups: [PublicGroup]
    me(token: String!): LoggedInUser
  }
`;

const Mutation = `
  type Mutation {
    login (
      email: Email!
      password: Password!
    ): Login
    
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
  typeDefs: [SchemaDefinition, Query, Mutation, PublicGroupType, LoggedInUserType, LoginType,
    PasswordScalar, EmailScalar, GroupInput, GroupType, BoatType, BoatInput, EntryInput,
    ParticipationInput, EntryType],
  resolvers,
});
