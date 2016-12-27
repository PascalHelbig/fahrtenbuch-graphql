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

  const query = `query { password (input: ${password}) }`;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot()
  );
};

it('should except a password with 5 chars', () =>
  testPassword('"12345"')
);

it('should not except a password with less then 5 chars', () =>
  testPassword('"1234"')
);

it('should not except a password with more than 254 chars', () => {
  let password = '';
  for (let i = 0; i < 255; i += 1) {
    password += 'a';
  }
  return testPassword(`"${password}"`);
});

it('should not except a password with the type int', () =>
  testPassword(12345)
);
