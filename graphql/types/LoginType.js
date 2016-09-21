const { GraphQLObjectType, GraphQLString } = require('graphql');
const UserType = require('./UserType');

module.exports = new GraphQLObjectType({
  name: 'LoginType',
  fields: {
    token: { type: GraphQLString },
    user: { type: UserType },
  },
});
