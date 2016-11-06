const LoggedInUserType = require('./LoggedInUserType');

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

module.exports.schema = () => [LoginType, LoggedInUserType.schema];
module.exports.resolver = resolver;
