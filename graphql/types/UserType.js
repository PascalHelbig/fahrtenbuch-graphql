const OwnerInterface = require('./../interfaces/OwnerInterface').schema;

const UserType = `
  type User implements Owner {
    id: ID!
    name: String
  }
`;

const resolver = {
  id: user => user.get('id'),
  name: user => user.get('name'),
};

module.exports.schema = () => [UserType, OwnerInterface];
module.exports.resolver = resolver;
