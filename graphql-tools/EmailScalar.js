const ValidStringScalar = require('./ValidStringScalar');

const EmailScalar = `
  scalar Email
`;

const resolver = ValidStringScalar({
  name: 'Email',
  // http://stackoverflow.com/a/46181/761555
  regex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
});

module.exports.schema = () => [EmailScalar];
module.exports.resolver = resolver;
