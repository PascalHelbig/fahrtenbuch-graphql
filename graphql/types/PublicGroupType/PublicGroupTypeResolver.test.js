const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const PublicGroupType = require('./PublicGroupType');
const PublicGroupTypeResolver = require('./PublicGroupTypeResolver');

const testPropterty = (propterty, returnValue, getParameter) => {
  const SchemaDefinition = `
    type Query {
      publicGroup: PublicGroup
    }
    
    schema { query: Query }`;

  const get = jest.fn().mockReturnValue(returnValue);
  const mockBookshelf = { get };
  const resolvers = {
    Query: {
      publicGroup: () => mockBookshelf,
    },
    PublicGroup: PublicGroupTypeResolver,
  };
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, PublicGroupType], resolvers });

  const query = `
    query { 
      publicGroup {
        ${propterty}
     }
    }
  `;

  return graphql(schema, query).then((result) => {
    expect(result).toMatchSnapshot();
    expect(get).toHaveBeenCalledWith(getParameter);
  });
};

it('should get the id from model', () =>
  testPropterty('id', '1337', 'id')
);

it('should get the name from model', () =>
  testPropterty('name', 'the name', 'name')
);

it('should get the is_club from model', () =>
  testPropterty('is_club', true, 'is_club')
);
