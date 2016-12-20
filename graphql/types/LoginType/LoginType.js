const LoggedInUserType = require('./../LoggedInUserType/LoggedInUserType');

const LoginType = `
  type Login {
    user: LoggedInUser!
    token: String!
  }
`;

module.exports = () => [LoginType, LoggedInUserType];
