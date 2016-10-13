const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql');
const { globalIdField, connectionDefinitions, connectionFromPromisedArray, connectionArgs } = require('graphql-relay');
const UserType = require('./UserType');
const groupController = require('../../controllers/group');
const { nodeInterface } = require('../relayNode');

module.exports = new GraphQLObjectType({
  name: 'Group',
  isTypeOf: obj => groupController.instanceof(obj),
  fields: {
    id: globalIdField('Group'),
    name: { type: GraphQLString, resolve: group => group.get('name') },
    isClub: { type: GraphQLBoolean, resolve: group => group.get('is_club') },
    members: {
      description: 'A list of groups users',
      type: connectionDefinitions({ name: 'User', nodeType: UserType }).connectionType,
      args: connectionArgs,
      resolve: (group, args) =>
        connectionFromPromisedArray(groupController.getMembers(group), args),
    },
  },
  interfaces: [nodeInterface],
});
