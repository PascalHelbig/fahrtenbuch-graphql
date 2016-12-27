const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const EntryType = require('./EntryType');
const EntryTypeResolver = require('./EntryTypeResolver');

const testPropterty = (propterty, returnValue) => {
  const SchemaDefinition = `
    type Query {
      entry: Entry
    }
        
    schema { query: Query }`;

  const mockBookshelf = {
    get: jest.fn().mockReturnValue(returnValue),
    related: jest.fn().mockReturnValue(returnValue),
  };
  const resolvers = {
    Query: {
      entry: () => mockBookshelf,
    },
    Entry: EntryTypeResolver,
  };
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, EntryType], resolvers });

  const query = `
    query { 
      entry {
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

it('should get the text from model', () =>
  testPropterty('text', 'the text').then(({ get }) =>
    expect(get).toHaveBeenCalledWith('text')
  )
);

it('should get the start from model', () =>
  testPropterty('start', 'the start').then(({ get }) =>
    expect(get).toHaveBeenCalledWith('start')
  )
);

it('should get the end from model', () =>
  testPropterty('end', 'the end').then(({ get }) =>
    expect(get).toHaveBeenCalledWith('end')
  )
);

it('should get the sailed from model', () =>
  testPropterty('sailed', 2).then(({ get }) =>
    expect(get).toHaveBeenCalledWith('sailed')
  )
);

it('should get the motor from model', () =>
  testPropterty('motor', 3).then(({ get }) =>
    expect(get).toHaveBeenCalledWith('motor')
  )
);

it('should get the creator from model', () =>
  testPropterty('creator { id }', { id: 'the creator id' }).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('creator')
  )
);

it('should get the participations from model', () =>
  testPropterty('participations { id }', [{ id: 'the creator id' }]).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('participations')
  )
);
