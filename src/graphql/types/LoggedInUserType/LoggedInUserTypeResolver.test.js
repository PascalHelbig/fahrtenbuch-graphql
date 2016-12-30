const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const LoggedInUserType = require('./LoggedInUserType');
const LoggedInUserTypeResolver = require('./LoggedInUserTypeResolver');

const SchemaDefinition = `
  type Query {
    loggedInUser: LoggedInUser
  }
      
  schema { query: Query }
`;

const testPropterty = (propterty, returnValue) => {
  const mockBookshelf = {
    get: jest.fn().mockReturnValue(returnValue),
    related: jest.fn().mockReturnValue(returnValue),
    availableBoats: jest.fn().mockReturnValue(returnValue),
  };
  const resolvers = {
    Query: {
      loggedInUser: () => mockBookshelf,
    },
    LoggedInUser: LoggedInUserTypeResolver,
  };
  const schema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, LoggedInUserType],
    resolvers,
  });

  const query = `
    query { 
      loggedInUser {
        ${propterty}
     }
    }
  `;

  return graphql(schema, query).then((result) => {
    expect(result).toMatchSnapshot();
    return mockBookshelf;
  });
};

it('should get the email from model', () =>
  testPropterty('email', 'test@example.com')
);

it('should get the user from model', () => {
  const schema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, LoggedInUserType],
    resolvers: {
      Query: { loggedInUser: () => ({ id: 1337 }) },
      LoggedInUser: LoggedInUserTypeResolver,
    },
  });
  const query = `
    query {
      loggedInUser {
        user {
          id
        }
      }
    }
  `;
  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot()
  );
});

it('should get the memberships from model', () =>
  testPropterty('memberships { group { id } }', []).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('groups')
  )
);

it('should get the boats from model', () =>
  testPropterty('boats { id }', [{ id: 'boat id' }]).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('boats')
  )
);

it('should get the availableBoats from model', () =>
  testPropterty('availableBoats { id }', [{ id: 'boat id' }]).then(({ availableBoats }) =>
    expect(availableBoats).toHaveBeenCalled()
  )
);

it('should get the participations from model', () =>
  testPropterty('participations { id }', [{ id: 'participation id' }]).then(({ related }) =>
    expect(related).toHaveBeenCalledWith('participations')
  )
);
