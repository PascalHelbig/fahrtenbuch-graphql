const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const MembershipType = require('./MembershipType');
const MembershipTypeResolver = require('./MembershipTypeResolver');

jest.mock('../../../models/Group');
jest.mock('../../../models/User');

const SchemaDefinition = `
  type Query {
    membership: Membership
  }
      
  schema { query: Query }
`;

const testPropterty = (propterty, returnValue) => {
  const mockBookshelf = {
    pivot: {
      get: jest.fn().mockReturnValue(returnValue),
    },
  };
  const resolvers = {
    Query: {
      membership: () => mockBookshelf,
    },
    Membership: MembershipTypeResolver,
  };
  const schema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, MembershipType],
    resolvers,
  });

  const query = `
    query { 
      membership {
        ${propterty}
     }
    }
  `;

  return graphql(schema, query).then((result) => {
    expect(result).toMatchSnapshot();
    return mockBookshelf;
  });
};

it('should get the is_admin from model', () =>
  testPropterty('is_admin', true).then(({ pivot }) =>
    expect(pivot.get).toHaveBeenCalledWith('is_admin')
  )
);

it('should get the user from model', () =>
  testPropterty('user { id }').then(({ pivot }) =>
    expect(pivot.get).toHaveBeenCalledWith('user_id')
  )
);

it('should get the group from model', () =>
  testPropterty('group { id }').then(({ pivot }) =>
    expect(pivot.get).toHaveBeenCalledWith('group_id')
  )
);
