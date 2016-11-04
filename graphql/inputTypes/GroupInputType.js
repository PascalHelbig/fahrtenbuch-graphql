const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'GroupInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    is_club: { type: GraphQLBoolean },
  },
});
