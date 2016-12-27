const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const ParticipationType = require('./ParticipationType');

it('has to be a valid schema', () => {
  const SchemaDefinition = 'schema { query: Participation }';
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, ParticipationType] });
  addMockFunctionsToSchema({
    schema,
    mocks: {
      Participation: () => ({
        id: () => '1337',
        user: () => ({ id: '1338' }),
        boat: () => ({ id: '1339' }),
        entry: () => ({ id: '1340' }),
      }),
    },
  });

  const query = `
    query {
      id
      user { id }
      boat { id }
      entry { id }
    }
  `;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot(),
  );
});
