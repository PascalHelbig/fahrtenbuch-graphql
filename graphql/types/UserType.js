const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const EmailType = require('../scalar/EmailType');
const BoatType = require('./BoatType');
// const GroupType = require('./GroupType');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID, resolve: user => user.get('id') },
    name: { type: GraphQLString, resolve: user => user.get('name') },
    email: { type: EmailType, resolve: user => user.get('email') },
    boats: { type: new GraphQLList(BoatType), resolve: user => user.boats().fetch() },
    // groups: { type: new GraphQLList(GroupType), resolve: user => user.groups().fetch() },
    groups: { type: new GraphQLList(require('./GroupType')), resolve: user => user.groups().fetch() },
  }),
});

module.exports = UserType;
