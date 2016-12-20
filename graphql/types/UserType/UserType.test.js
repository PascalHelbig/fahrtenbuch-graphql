const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const UserType = require('./UserType');

it('has to be a valid schema', () => {
  const SchemaDefinition = 'schema { query: User }';
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, UserType] });
  addMockFunctionsToSchema({
    schema,
    mocks: {
      User: () => ({
        id: () => '1337',
        name: () => 'user name',
      }),
    },
  });

  const query = `
    query {
      id
      name
    }
  `;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot(),
  );
});
