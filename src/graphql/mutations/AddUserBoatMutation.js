const BoatInput = require('../inputs/BoatInput').schema;
const BoatType = require('../types/BoatType/BoatType');

module.exports.schema = `
  addUserBoat(
    token: String!
    boat: BoatInput!
  ): Boat
`;

module.exports.usedTypes = () => [BoatInput, BoatType];
