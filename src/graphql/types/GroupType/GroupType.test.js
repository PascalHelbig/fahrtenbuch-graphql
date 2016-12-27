const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const GroupType = require('./GroupType');

it('has to be a valid schema', () => {
  const SchemaDefinition = 'schema { query: Group }';
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, GroupType] });
  addMockFunctionsToSchema({
    schema,
    mocks: {
      Group: () => ({
        id: () => '1337',
        name: () => 'Club Name',
        is_club: () => true,
        members: () => [{ id: 1338 }, { id: 1339 }],
        boats: () => [{ id: 1340 }, { id: 1341 }],
      }),
    },
  });

  const query = `
    query {
      id
      name
      is_club
      members { id }
      boats { id }
    }
  `;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot(),
  );
});
