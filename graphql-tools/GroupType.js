const GroupType = `
  type Group {
    id: ID!
    name: String!
    is_club: Boolean!
  }
`;

const resolver = {
  id: group => group.get('id'),
  name: group => group.get('name'),
  is_club: group => group.get('is_club'),
};

module.exports.schema = () => [GroupType];
module.exports.resolver = resolver;
