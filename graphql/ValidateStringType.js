const { GraphQLScalarType } = require('graphql');
const { GraphQLError } = require('graphql/error');
const { Kind } = require('graphql/language');

module.exports = params =>
  new GraphQLScalarType({
    name: params.name,
    serialize: value => value,
    parseValue: value => value,
    parseLiteral: (ast) => {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(`Query error: Can only parse strings got a: ${ast.kind}`, [ast]);
      }
      if (ast.value.length < params.min) {
        throw new GraphQLError(`Query error: minimum length of ${params.min} required: `, [ast]);
      }
      if (ast.value.length > params.max) {
        throw new GraphQLError(`Query error: maximum length is ${params.max}: `, [ast]);
      }
      if (params.regex !== null && !params.regex.test(ast.value)) {
        throw new GraphQLError(`Query error: Not a valid ${params.name}: `, [ast]);
      }
      return ast.value;
    },
  });

// module.exports = ValidateStringType;
