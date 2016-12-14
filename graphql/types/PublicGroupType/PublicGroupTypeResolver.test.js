const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const PublicGroupType = require('./PublicGroupType');
const PublicGroupTypeResolver = require('./PublicGroupTypeResolver');

const SchemaDefinition = `
  type Query {
    publicGroup: PublicGroup
  }
  
  schema { query: Query }`;

it('should get the id from model', () => {
  const get = jest.fn().mockReturnValue('1337');
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
        id
     }
    }
  `;

  return graphql(schema, query).then((result) => {
    expect(result).toMatchSnapshot();
    expect(get).toHaveBeenCalledWith('id');
  });
});

it('should get the name from model', () => {
  const get = jest.fn().mockReturnValue('the name');
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
        name
     }
    }
  `;

  return graphql(schema, query).then((result) => {
    expect(result).toMatchSnapshot();
    expect(get).toHaveBeenCalledWith('name');
  });
});

it('should get the is_club from model', () => {
  const get = jest.fn().mockReturnValue(true);
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
        is_club
     }
    }
  `;

  return graphql(schema, query).then((result) => {
    expect(result).toMatchSnapshot();
    expect(get).toHaveBeenCalledWith('is_club');
  });
});
