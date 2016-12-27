const EntryInput = `
  input EntryInput {
    text: String!
    start: String!
    end: String!
    sailed: Int!
    motor: Int
  }
`;

module.exports.schema = () => [EntryInput];
