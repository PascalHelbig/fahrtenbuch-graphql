const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
// const BoatInterface = require('../interfaces/BoatInterface');

module.exports = new GraphQLObjectType({
  name: 'BoatFromUserType',
  fields: () => ({
    id: { type: GraphQLID, resolve: boat => boat.get('id') },
    name: { type: GraphQLString, resolve: boat => boat.get('name') },
    owner: { type: require('./UserType'), resolve: boat => boat.related('owner') },
  }),
  interfaces: [require('../interfaces/BoatInterface')],
});
