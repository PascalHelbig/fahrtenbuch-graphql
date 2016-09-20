const { GraphQLInputObjectType, GraphQLNonNull } = require('graphql');
const EmailType = require('../scalar/EmailType');
const PasswordType = require('../scalar/PasswordType');

const SignupInputType = new GraphQLInputObjectType({
  name: 'SignupInputType',
  fields: {
    email: { type: new GraphQLNonNull(EmailType) },
    password: { type: new GraphQLNonNull(PasswordType) },
  },
});

module.exports = SignupInputType;
