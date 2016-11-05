const { GraphQLInterfaceType, GraphQLID, GraphQLString } = require('graphql');
const User = require('../../models/Users');

module.exports = new GraphQLInterfaceType({
  name: 'BoatInterface',
  fields: {
    id: { type: GraphQLID, resolve: boat => boat.get('id') },
    name: { type: GraphQLString, resolve: boat => boat.get('name') },
  },
  resolveType: (boat) => {
    if (boat.related('owner') instanceof User) {
      return require('../types/BoatFromUserType');
    }
    return require('../types/BoatFromGroupType');
  },
});
