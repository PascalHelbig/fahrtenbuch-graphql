const { makeExecutableSchema } = require('graphql-tools');
const PublicGroupType = require('./PublicGroupType').schema;
const LoggedInUserType = require('./LoggedInUserType').schema;
const resolvers = require('./resolvers');

const Query = `
  type Query {
    groups: [PublicGroup]
  }
`;

const Mutation = `
  type Mutation {
    login (
      email: String!
      password: String!
    ): LoggedInUser
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, Mutation, PublicGroupType, LoggedInUserType],
  resolvers,
});
