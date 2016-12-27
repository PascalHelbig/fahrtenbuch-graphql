const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const GroupType = require('./GroupType');
const GroupTypeResolver = require('./GroupTypeResolver');

const testPropterty = (propterty, returnValue) => {
  const SchemaDefinition = `
    type Query { group: Group }
    schema { query: Query }`;

  const mockBookshelf = {
    get: jest.fn().mockReturnValue(returnValue),
    related: jest.fn().mockReturnValue(returnValue),
  };
  const resolvers = {
    Query: { group: () => mockBookshelf },
    Group: GroupTypeResolver,
  };
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, GroupType], resolvers });

  const query = `
    query { 
      group {
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
  testPropterty('name', 'the group name').then(({ get }) =>
    expect(get).toHaveBeenCalledWith('name')
  )
);

it('should get the is_club from model', () =>
  testPropterty('is_club', true).then(({ get }) =>
    expect(get).toHaveBeenCalledWith('is_club')
  )
);

it('should get the members from model', () =>
  testPropterty('members { id }', [{ id: 'a member id' }]).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('members')
  )
);

it('should get the boats from model', () =>
  testPropterty('boats { id }', [{ id: 'a boat id' }]).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('boats')
  )
);
