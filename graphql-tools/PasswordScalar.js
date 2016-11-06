const ValidStringScalar = require('./ValidStringScalar');

const PasswordScalar = `
  scalar Password
`;

const resolver = ValidStringScalar({
  min: 5,
  max: 254,
  name: 'Password',
});

module.exports.schema = () => [PasswordScalar];
module.exports.resolver = resolver;
