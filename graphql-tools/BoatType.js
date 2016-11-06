const OwnerInterface = require('./OwnerInterface').schema;

const BoatType = `
  type Boat {
    id: ID!
    name: String
    owner: Owner
  }
`;

const resolver = {
  id: boat => boat.get('id'),
  name: boat => boat.get('name'),
  owner: boat => boat.related('owner'),
};
module.exports.schema = () => [BoatType, OwnerInterface];
module.exports.resolver = resolver;
