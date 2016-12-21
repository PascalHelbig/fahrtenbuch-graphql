const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const PasswordScalar = require('./PasswordScalar');

const testPassword = (password) => {
  const SchemaDefinition = `
    type Query { password(input: Password!) : Password }
    schema { query: Query }
  `;
  const resolvers = {
    Query: {
      password: (_, { input }) => input,
    },
    Password: PasswordScalar.resolver,
  };
  const schema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, PasswordScalar.schema],
    resolvers,
  });

  const query = `query { password (input: "${password}") }`;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot()
  );
};

it('should except a password with 5 chars', () =>
  testPassword('12345')
);

it('should not except a password with less then 5 chars', () =>
  testPassword('1234')
);
