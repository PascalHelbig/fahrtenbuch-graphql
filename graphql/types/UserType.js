const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { globalIdField, connectionDefinitions, connectionArgs, connectionFromPromisedArray } = require('graphql-relay');
const EmailType = require('../scalar/EmailType');
// const BoatInterface = require('../interfaces/BoatInterface');
const BoatFromUserType = require('./BoatFromUserType');
const userController = require('../../controllers/user');
const { nodeInterface } = require('../relayNode');

module.exports = new GraphQLObjectType({
  name: 'User',
  isTypeOf: obj => userController.instanceof(obj),
  fields: () => ({
    id: globalIdField('User'),
    name: { type: GraphQLString, resolve: user => user.get('name') },
    email: { type: EmailType, resolve: user => user.get('email') },
    availableBoats: {
      type: new GraphQLList(require('../interfaces/BoatInterface')),
      resolve: user => user.availableBoats(),
    },
    boats: { type: new GraphQLList(BoatFromUserType), resolve: user => user.boats().fetch({ withRelated: ['owner'] }) },
    groups: {
      description: 'A list of users groups',
      // eslint-disable-next-line global-require
      type: connectionDefinitions({ name: 'Group', nodeType: require('./GroupType') }).connectionType,
      args: connectionArgs,
      resolve: (user, args) => connectionFromPromisedArray(userController.getGroups(user), args),
    },
  }),
  interfaces: [nodeInterface],
});
