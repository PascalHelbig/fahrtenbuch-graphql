const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
const userController = require('../controllers/user');
const LoginType = require('./types/LoginType');
const SignupInputType = require('./inputTypes/SignupInputType');
const PasswordType = require('./scalar/PasswordType');
const EmailType = require('./scalar/EmailType');

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello World',
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    signup: {
      type: LoginType,
      args: {
        user: { type: new GraphQLNonNull(SignupInputType) },
      },
      resolve: (value, { user }) => userController.signup(user),
    },
    login: {
      type: LoginType,
      args: {
        email: { type: new GraphQLNonNull(EmailType) },
        password: { type: new GraphQLNonNull(PasswordType) },
      },
      resolve: (parent, { email, password }) => userController.login(email, password),
    },
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
