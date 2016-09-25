const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList } = require('graphql');
const UserType = require('./UserType');

module.exports = new GraphQLObjectType({
  name: 'GroupType',
  fields: {
    id: { type: GraphQLID, resolve: group => group.get('id') },
    name: { type: GraphQLString, resolve: group => group.get('name') },
    isClub: { type: GraphQLBoolean, resolve: group => group.get('is_club') },
    members: { type: new GraphQLList(UserType), resolve: group => group.members().fetch() },
  },
});
