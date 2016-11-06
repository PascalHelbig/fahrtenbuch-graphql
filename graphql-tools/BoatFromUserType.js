const UserType = require('./UserType').schema;

const BoatFromUserType = `
  type BoatFromUser {
    id: ID!
    name: String
    owner: User!
  }
`;

const resolver = {
  id: boat => boat.get('id'),
  name: boat => boat.get('name'),
  owner: boat => boat.related('owner'),
};

module.exports.schema = () => [BoatFromUserType, UserType];
module.exports.resolver = resolver;
