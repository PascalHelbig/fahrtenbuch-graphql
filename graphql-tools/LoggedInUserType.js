const LoggedInUserType = `
  type LoggedInUser {
    id: ID!
    email: String!
    name: String
  }
`;

const resolver = {
  id: user => user.get('id'),
  email: user => user.get('email'),
  name: user => user.get('name'),
};

module.exports.schema = () => [LoggedInUserType];
module.exports.resolver = resolver;
