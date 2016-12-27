const OwnerInterface = require('./../../interfaces/OwnerInterface').schema;

const BoatType = `
  type Boat {
    id: ID!
    name: String
    owner: Owner
  }
`;

module.exports = () => [BoatType, OwnerInterface];
