const { makeExecutableSchema } = require('graphql-tools');
const PublicGroupType = require('./types/PublicGroupType/PublicGroupType');
const LoggedInUserType = require('./types/LoggedInUserType/LoggedInUserType');
const resolvers = require('./resolvers');
const Mutation = require('./mutations/index');

const Query = `
  type Query {
    groups: [PublicGroup]
    me(token: String!): LoggedInUser
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, Query, Mutation.schema, PublicGroupType, LoggedInUserType, Mutation.usedTypes,
  ],
  resolvers,
});
