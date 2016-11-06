module.exports = `
  type PublicGroup {
    id: ID!
    name: String!
  }
  
  type Query {
    groups: [PublicGroup]
  }
  
  schema {
    query: Query
  }
`;
