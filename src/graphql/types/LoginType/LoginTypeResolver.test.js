const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const LoginType = require('./LoginType');
const LoginTypeResolver = require('./LoginTypeResolver');

const SchemaDefinition = `
  type Query {
    login: Login
  }
      
  schema { query: Query }
`;

const testPropterty = (propterty) => {
  const resolvers = {
    Query: {
      login: () => ({
        user: { email: 'test@example.com' },
        token: 'the token',
      }),
    },
    Login: LoginTypeResolver,
  };
  const schema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, LoginType],
    resolvers,
  });

  const query = `
    query { 
      login {
        ${propterty}
     }
    }
  `;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot()
  );
};

it('should get the token from model', () =>
  testPropterty('token')
);

it('should get the user from model', () =>
  testPropterty('user { email }')
);
