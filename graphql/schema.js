const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const userController = require('../controllers/user');
const groupController = require('../controllers/group');
const LoginType = require('./types/LoginType');
const UserType = require('./types/UserType');
const SignupInputType = require('./inputTypes/SignupInputType');
const PasswordType = require('./scalar/PasswordType');
const EmailType = require('./scalar/EmailType');
const BoatType = require('./types/BoatType');
const BoatInputType = require('./inputTypes/BoatInputType');
const GroupType = require('./types/GroupType');

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello World',
    },
    me: {
      type: UserType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, { token }) => userController.me(token),
    },
    groups: {
      type: new GraphQLList(GroupType),
      resolve: () => groupController.all(),
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
    addUserBoat: {
      type: BoatType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
        boat: { type: new GraphQLNonNull(BoatInputType) },
      },
      resolve: (parent, { token, boat }) => userController.addUserBoat(token, boat),
    },
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
