const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'BoatType',
  fields: {
    id: { type: GraphQLID, resolve: boat => boat.toJSON().id },
    name: { type: GraphQLString, resolve: boat => boat.toJSON().name },
  },
});
