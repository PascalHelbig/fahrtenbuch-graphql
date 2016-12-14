const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const PublicGroupType = require('./PublicGroupType');

it('has to be a valid schema', () => {
  const SchemaDefinition = 'schema { query: PublicGroup }';
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, PublicGroupType] });
  addMockFunctionsToSchema({
    schema,
    mocks: {
      PublicGroup: () => ({
        id: () => '1337',
        name: () => 'Club Name',
        is_club: () => true,
      }),
    },
  });

  const query = `
    query {
      id
      name
      is_club
    }
  `;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot()
  );
});
