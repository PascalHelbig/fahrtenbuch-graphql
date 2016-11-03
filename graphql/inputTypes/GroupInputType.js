const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'GroupInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    isClub: { type: GraphQLBoolean },
  },
});
