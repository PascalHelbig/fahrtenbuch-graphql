const groupController = require('../controllers/group');
const userController = require('../controllers/user');
const PublicGroup = require('./PublicGroupType').resolver;
const LoggedInUser = require('./LoggedInUserType').resolver;

module.exports = {
  Query: {
    groups: groupController.all,
  },
  Mutation: {
    login: (root, { email, password }) => userController.login(email, password),
    signup: (root, user) => userController.signup(user),
  },
  PublicGroup,
  LoggedInUser,
};
