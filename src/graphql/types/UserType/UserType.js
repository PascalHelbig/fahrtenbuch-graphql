const OwnerInterface = require('./../../interfaces/OwnerInterface').schema;

const UserType = `
  type User implements Owner {
    id: ID!
    name: String
  }
`;

module.exports = () => [UserType, OwnerInterface];
