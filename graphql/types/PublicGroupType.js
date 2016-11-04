const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql');
const { globalIdField } = require('graphql-relay');
const groupController = require('../../controllers/group');
const { nodeInterface } = require('../relayNode');

module.exports = new GraphQLObjectType({
  name: 'PublicGroup',
  isTypeOf: obj => groupController.instanceof(obj),
  fields: {
    id: globalIdField('Group'),
    name: { type: GraphQLString, resolve: group => group.get('name') },
    is_club: { type: GraphQLBoolean, resolve: group => group.get('is_club') },
  },
  interfaces: [nodeInterface],
});
