const GroupInput = require('../inputs/GroupInput').schema;
const GroupType = require('../types/GroupType/GroupType');

module.exports.schema = `
  addGroup(
    token: String!
    group: GroupInput!
  ): Group
`;

module.exports.usedTypes = () => [GroupInput, GroupType];
