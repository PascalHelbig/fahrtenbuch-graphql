const EmailScalar = require('../scalars/EmailScalar').schema;
const PasswordScalar = require('../scalars/PasswordScalar').schema;
const LoginType = require('../types/LoginType/LoginType');

module.exports.schema = `
  signup(
    email: Email!
    password: Password!
  ): Login
`;

module.exports.usedTypes = () => [EmailScalar, PasswordScalar, LoginType];
