const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const ParticipationType = require('./ParticipationType');
const ParticipationTypeResolver = require('./ParticipationTypeResolver');

const SchemaDefinition = `
  type Query {
    participation: Participation
  }
      
  schema { query: Query }
`;

const testPropterty = (propterty, returnValue) => {
  const mockBookshelf = {
    get: jest.fn().mockReturnValue(returnValue),
    related: jest.fn().mockReturnValue(returnValue),
  };
  const resolvers = {
    Query: {
      participation: () => mockBookshelf,
    },
    Participation: ParticipationTypeResolver,
  };
  const schema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, ParticipationType],
    resolvers,
  });

  const query = `
    query { 
      participation {
        ${propterty}
     }
    }
  `;

  return graphql(schema, query).then((result) => {
    expect(result).toMatchSnapshot();
    return mockBookshelf;
  });
};

it('should get the id from model', () =>
  testPropterty('id', '1337').then(({ get }) =>
    expect(get).toHaveBeenCalledWith('id')
  )
);

it('should get the user from model', () =>
  testPropterty('user { id }', { id: '1338' }).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('user')
  )
);

it('should get the boat from model', () =>
  testPropterty('boat { id }', { id: '1339' }).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('boat')
  )
);

it('should get the entry from model', () =>
  testPropterty('entry { id }', { id: '1340' }).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('entry')
  )
);
