const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const BoatType = require('./BoatType');

it('has to be a valid schema', () => {
  const SchemaDefinition = 'schema { query: Boat }';
  const mockOwnerType = 'type Owner { id: ID! }';
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, BoatType, mockOwnerType] });
  addMockFunctionsToSchema({
    schema,
    mocks: {
      Boat: () => ({
        id: () => '1337',
        name: () => 'Boat Name',
        owner: () => ({}),
      }),
      Owner: () => ({
        id: () => '1338',
      }),
    },
  });

  const query = `
    query {
      id
      name
      owner {
        id
      }
    }
  `;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot(),
  );
});
