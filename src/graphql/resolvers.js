const groupController = require('../controllers/group');
const userController = require('../controllers/user');
const PublicGroup = require('./types/PublicGroupType/PublicGroupTypeResolver');
const Login = require('./types/LoginType/LoginTypeResolver');
const LoggedInUser = require('./types/LoggedInUserType/LoggedInUserTypeResolver');
const Group = require('./types/GroupType/GroupTypeResolver');
const User = require('./types/UserType/UserTypeResolver');
const Boat = require('./types/BoatType/BoatTypeResolver');
const Owner = require('./interfaces/OwnerInterface').resolver;
const Password = require('./scalars/PasswordScalar').resolver;
const Email = require('./scalars/EmailScalar').resolver;
const Entry = require('./types/EntryType/EntryTypeResolver');
const Participation = require('./types/ParticipationType/ParticipationTypeResolver');

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
