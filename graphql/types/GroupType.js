const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'GroupType',
  fields: {
    id: { type: GraphQLID, resolve: group => group.get('id') },
    name: { type: GraphQLString, resolve: group => group.get('name') },
    isClub: { type: GraphQLBoolean, resolve: group => group.get('is_club') },
  },
});
