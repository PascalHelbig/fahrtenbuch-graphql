const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const EmailScalar = require('./EmailScalar');

const testEmail = (email) => {
  const SchemaDefinition = `
    type Query { email(input: Email!): Email}
    schema { query: Query }
  `;
  const resolvers = {
    Query: {
      email: (_, { input }) => input,
    },
    Email: EmailScalar.resolver,
  };
  const schema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, EmailScalar.schema],
    resolvers,
  });

  const query = `query { email (input: "${email}") }`;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot()
  );
};

it('should except a valid email addresse', () =>
  testEmail('test@test.de')
);

it('should ignore invalid email addresses', () =>
  Promise.all([
    testEmail('test@test'),
    testEmail('testtest.de'),
    testEmail('@testtest.de'),
    testEmail('testtest@.de'),
  ])
);

