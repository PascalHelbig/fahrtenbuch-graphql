const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull,
  GraphQLInputObjectType } = require('graphql');
const EmailType = require('./scalar/EmailType');
const PasswordType = require('./scalar/PasswordType');
const userController = require('../controllers/user');
const UserType = require('./types/UserType');

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello World',
    },
  },
});

const SignupInputType = new GraphQLInputObjectType({
  name: 'SignupInputType',
  fields: {
    email: { type: new GraphQLNonNull(EmailType) },
    password: { type: new GraphQLNonNull(PasswordType) },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    signup: {
      type: new GraphQLObjectType({
        name: 'SignupReturnType',
        fields: {
          token: { type: GraphQLString },
          user: { type: UserType },
        },
      }),
      args: {
        user: { type: new GraphQLNonNull(SignupInputType) },
      },
      resolve: (value, { user }) => userController.signup(user),
    },
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
