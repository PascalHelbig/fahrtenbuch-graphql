const UserType = `
  type User {
    id: ID!
    name: String
  }
`;

const resolver = {
  id: user => user.get('id'),
  name: user => user.get('name'),
};

module.exports.schema = () => [UserType];
module.exports.resolver = resolver;
