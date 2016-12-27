const { Kind } = require('graphql/language');
const { GraphQLError } = require('graphql/error');

const resolver = ({ min = 0, max = Number.MAX_VALUE, regex = null, name }) => ({
  __serialize: value => value,
  __parseValue: value => value,
  __parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Can only parse strings got a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < min) {
      throw new GraphQLError(`Query error: minimum length of ${min} required: `, [ast]);
    }
    if (ast.value.length > max) {
      throw new GraphQLError(`Query error: maximum length is ${max}: `, [ast]);
    }
    if (regex !== null && !regex.test(ast.value)) {
      throw new GraphQLError(`Query error: Not a valid ${name}: `, [ast]);
    }
    return ast.value;
  },
});

module.exports = resolver;
