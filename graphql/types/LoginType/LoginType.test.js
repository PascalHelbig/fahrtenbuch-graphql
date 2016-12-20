const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const LoginType = require('./LoginType');

it('has to be a valid schema', () => {
  const SchemaDefinition = 'schema { query: Login }';
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, LoginType] });
  addMockFunctionsToSchema({
    schema,
    mocks: {
      Login: () => ({
        token: () => 'the token',
        user: () => ({ email: 'test@example.com' }),
      }),
    },
  });

  const query = `
    query {
      token
      user { email }
    }
  `;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot(),
  );
});
