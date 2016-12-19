const LoggedInUserType = require('./LoggedInUserType/LoggedInUserType');

const LoginType = `
  type Login {
    user: LoggedInUser!
    token: String!
  }
`;

const resolver = {
  user: login => login.user,
  token: login => login.token,
};

module.exports.schema = () => [LoginType, LoggedInUserType];
module.exports.resolver = resolver;
