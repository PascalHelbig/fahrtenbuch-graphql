const GroupInput = `
  input GroupInput {
    name: String!
    is_club: Boolean!
  }
`;

module.exports.schema = () => [GroupInput];
