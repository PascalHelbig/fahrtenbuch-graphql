const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'BoatInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});
