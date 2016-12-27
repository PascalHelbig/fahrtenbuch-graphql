const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const LoggedInUserType = require('./LoggedInUserType');

it('has to be a valid schema', () => {
  const SchemaDefinition = 'schema { query: LoggedInUser }';
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, LoggedInUserType] });
  addMockFunctionsToSchema({
    schema,
    mocks: {
      LoggedInUser: () => ({
        user: () => ({ id: 1337 }),
        email: () => 'email@example.com',
        groups: () => [{ id: 1338 }, { id: 1339 }],
        boats: () => [{ id: 1340 }, { id: 1341 }],
        availableBoats: () => [{ id: 1341 }],
        participations: () => [{ id: 1342 }, { id: 1343 }],
      }),
    },
  });

  const query = `
    query {
      email
      user { id }
      groups { id }
      boats { id }
      availableBoats { id }
      participations { id }
    }
  `;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot(),
  );
});
