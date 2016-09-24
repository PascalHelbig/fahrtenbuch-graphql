const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const EmailType = require('../scalar/EmailType');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID, resolve: user => user.toJSON().id },
    name: { type: GraphQLString, resolve: user => user.toJSON().name },
    email: { type: EmailType, resolve: user => user.toJSON().email },
  },
});

module.exports = UserType;
