const EntryInput = require('../inputs/EntryInput').schema;
const ParticipationInput = require('../inputs/ParticipationInput').schema;
const EntryType = require('../types/EntryType/EntryType');

module.exports.schema = `
  addEntry(
    token: String!
    entry: EntryInput!
    participations: [ParticipationInput]!
  ): Entry
`;

module.exports.usedTypes = () => [EntryInput, ParticipationInput, EntryType];
