const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const MembershipType = require('./MembershipType');

it('has to be valid schema', () => {
  const SchemaDefinition = 'schema { query: Membership }';
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, MembershipType] });
  addMockFunctionsToSchema({
    schema,
    mocks: {
      Membership: () => ({
        user: () => ({ id: 1337 }),
        group: () => ({ id: 1338 }),
        is_admin: () => true,
      }),
    },
  });

  const query = `{
    user { id }
    group { id }
    is_admin
  }`;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot()
  );
});
