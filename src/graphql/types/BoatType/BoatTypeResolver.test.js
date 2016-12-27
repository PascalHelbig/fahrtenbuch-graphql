const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const BoatType = require('./BoatType');
const BoatTypeResolver = require('./BoatTypeResolver');

const testPropterty = (propterty, returnValue) => {
  const SchemaDefinition = `
    type Query {
      boat: Boat
    }
        
    schema { query: Query }`;

  const mockBookshelf = {
    get: jest.fn().mockReturnValue(returnValue),
    related: jest.fn().mockReturnValue(returnValue),
  };
  const resolvers = {
    Query: {
      boat: () => mockBookshelf,
    },
    Boat: BoatTypeResolver,
  };
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, BoatType], resolvers });

  const query = `
    query { 
      boat {
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

it('should get the name from model', () =>
  testPropterty('name', 'the name').then(({ get }) =>
    expect(get).toHaveBeenCalledWith('name')
  )
);

it('should get the owner from model', () =>
  testPropterty('owner { id }', { id: 'the owner' }).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('owner')
  )
);
