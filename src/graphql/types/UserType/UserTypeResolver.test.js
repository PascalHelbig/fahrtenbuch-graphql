const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const UserType = require('./UserType');
const UserTypeResolver = require('./UserTypeResolver');

const SchemaDefinition = `
  type Query {
    user: User
  }
      
  schema { query: Query }
`;

const testPropterty = (propterty, returnValue) => {
  const mockBookshelf = { get: jest.fn().mockReturnValue(returnValue) };
  const resolvers = {
    Query: {
      user: () => mockBookshelf,
    },
    User: UserTypeResolver,
  };
  const schema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, UserType],
    resolvers,
  });

  const query = `
    query { 
      user {
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
  testPropterty('name', 'users name').then(({ get }) =>
    expect(get).toHaveBeenCalledWith('name')
  )
);
