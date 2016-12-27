const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const EntryType = require('./EntryType');

it('has to be a valid schema', () => {
  const SchemaDefinition = 'schema { query: Entry }';
  const UserTypeMock = 'type User { id: ID! }';
  const ParticipationTypeMock = 'type Participation { id: ID! }';
  const schema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, EntryType, UserTypeMock, ParticipationTypeMock],
  });
  addMockFunctionsToSchema({
    schema,
    mocks: {
      Entry: () => ({
        id: () => '1337',
        text: () => 'the text',
        start: () => 'the start',
        end: () => 'the end',
        sailed: () => 1,
        motor: () => 2,
        participations: () => [{ id: '1338' }, { id: '1339' }],
        creator: () => ({ id: 1340 }),
      }),
    },
  });

  const query = `
    query {
      id
      text
      start
      end
      sailed
      motor
      creator { id }
      participations { id }
    }
  `;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot(),
  );
});
