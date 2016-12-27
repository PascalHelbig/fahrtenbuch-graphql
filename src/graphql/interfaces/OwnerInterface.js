const User = require('../../models/User');

const OwnerInterface = `
  interface Owner {
    id: ID!
    name: String
  }
`;

const resolver = {
  id: owner => owner.get('id'),
  name: owner => owner.get('name'),
  __resolveType: (owner) => {
    if (owner instanceof User) {
      return 'User';
    }
    return 'Group';
  },
};
module.exports.schema = () => [OwnerInterface];
module.exports.resolver = resolver;
