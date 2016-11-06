const { makeExecutableSchema } = require('graphql-tools');
const PublicGroupType = require('./PublicGroupType').schema;
const LoginType = require('./LoginType').schema;
const LoggedInUserType = require('./LoggedInUserType').schema;
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
      email: String!
      password: String!
    ): Login
    
    signup(
      email: String!
      password: String!
    ): Login
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, Mutation, PublicGroupType, LoggedInUserType, LoginType],
  resolvers,
});
