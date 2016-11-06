const { makeExecutableSchema } = require('graphql-tools');
const PublicGroupType = require('./PublicGroupType').schema;
const resolvers = require('./resolvers');

const Query = `
  type Query {
    groups: [PublicGroup]
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, PublicGroupType],
  resolvers,
});
