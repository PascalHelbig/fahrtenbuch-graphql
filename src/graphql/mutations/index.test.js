const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const Mutation = require('./index');

jest.mock('../../models/User.js');

it('should list all mutations', () => {
  const SchemaDefinition = `
    ${Mutation.schema}
    type Query { ignore: Boolean }
    schema { mutation: Mutation, query: Query } 
  `;
  const schema = makeExecutableSchema({ typeDefs: [SchemaDefinition, Mutation.usedTypes] });
  const query = `
    {
      __schema {
        mutationType {
          fields {
            name
            args { name }
            type { name }
          }
        }
      }
    }
  `;

  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot()
  );
});
