const { makeExecutableSchema } = require('graphql-tools');
const PublicGroupType = require('./PublicGroupType').schema;
const LoginType = require('./LoginType').schema;
const LoggedInUserType = require('./LoggedInUserType').schema;
const PasswordScalar = require('./PasswordScalar').schema;
const EmailScalar = require('./EmailScalar').schema;
const GroupType = require('./GroupType').schema;
const GroupInput = require('./GroupInput').schema;
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
    PasswordScalar, EmailScalar, GroupInput, GroupType],
  resolvers,
});
