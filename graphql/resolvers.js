const groupController = require('../controllers/group');
const userController = require('../controllers/user');
const PublicGroup = require('./types/PublicGroupType').resolver;
const Login = require('./types/LoginType').resolver;
const LoggedInUser = require('./types/LoggedInUserType').resolver;
const Group = require('./types/GroupType').resolver;
const User = require('./types/UserType').resolver;
const Boat = require('./types/BoatType').resolver;
const Owner = require('./interfaces/OwnerInterface').resolver;
const Password = require('./scalars/PasswordScalar').resolver;
const Email = require('./scalars/EmailScalar').resolver;
const Entry = require('./types/EntryType').resolver;
const Participation = require('./types/ParticipationType').resolver;

module.exports = {
  Query: {
    groups: groupController.all,
    me: (root, { token }) => userController.me(token),
  },
  Mutation: {
    login: (root, { email, password }) => userController.login(email, password),
    signup: (root, user) => userController.signup(user),
    addGroup: (root, { token, group }) => userController.addGroup(token, group),
    addUserBoat: (root, { token, boat }) => userController.addUserBoat(token, boat),
    addEntry: (root, { token, entry, participations }) =>
      userController.addEntry(token, entry, participations),
  },
  PublicGroup,
  Login,
  LoggedInUser,
  Group,
  User,
  Boat,
  Owner,
  Password,
  Email,
  Entry,
  Participation,
};
