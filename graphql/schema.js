const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull,
  GraphQLInt, GraphQLInputObjectType } = require('graphql');
const EmailType = require('./EmailType');

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello World',
    },
  },
});

const SignupInputType = new GraphQLInputObjectType({
  name: 'SignupInputType',
  fields: {
    email: { type: new GraphQLNonNull(EmailType) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    signup: {
      type: GraphQLInt,
      args: {
        user: { type: new GraphQLNonNull(SignupInputType) },
      },
      resolve: (value, { user }) => {
        console.log(user);
        return 234234;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
