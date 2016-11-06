const LoggedInUserType = `
  type LoggedInUser {
    id: ID!
    email: String!
    name: String
    token: String!
  }
`;

const resolver = {
  id: user => user.user.get('id'),
  email: user => user.user.get('email'),
  name: user => user.user.get('name'),
  token: user => user.token,
};

module.exports.schema = () => [LoggedInUserType];
module.exports.resolver = resolver;
