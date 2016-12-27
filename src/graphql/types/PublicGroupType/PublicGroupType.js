const PublicGroupType = `
  type PublicGroup {
    id: ID!
    name: String!
    is_club: Boolean!
  }
`;

module.exports = () => [PublicGroupType];
