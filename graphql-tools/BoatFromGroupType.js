// https://github.com/apollostack/graphql-server/issues/126#issuecomment-245833750
// eslint-disable-next-line no-use-before-define
module.exports.schema = () => [BoatFromGroupType, GroupType];

const GroupType = require('./GroupType').schema;

const BoatFromGroupType = `
  type BoatFromGroup {
    id: ID!
    name: String
    owner: Group    
  }
`;

const resolver = {
  id: boat => boat.get('id'),
  name: boat => boat.get('name'),
  owner: boat => boat.related('owner'),
};
module.exports.resolver = resolver;
