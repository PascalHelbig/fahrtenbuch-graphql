const groupController = require('../controllers/group');
const userController = require('../controllers/user');
const PublicGroup = require('./PublicGroupType').resolver;
const Login = require('./LoginType').resolver;
const LoggedInUser = require('./LoggedInUserType').resolver;
const Group = require('./GroupType').resolver;
const User = require('./UserType').resolver;
const Boat = require('./BoatType').resolver;
const Owner = require('./OwnerInterface').resolver;

module.exports = {
  Query: {
    groups: groupController.all,
    me: (root, { token }) => userController.me(token),
  },
  Mutation: {
    login: (root, { email, password }) => userController.login(email, password),
    signup: (root, user) => userController.signup(user),
  },
  PublicGroup,
  Login,
  LoggedInUser,
  Group,
  User,
  Boat,
  Owner,
};
