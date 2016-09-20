const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const EmailType = require('../scalar/EmailType');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID, resolve: ({ id }) => id },
    name: { type: GraphQLString, resolve: ({ name }) => name },
    email: { type: EmailType, resolve: ({ email }) => email },
  },
});

module.exports = UserType;
