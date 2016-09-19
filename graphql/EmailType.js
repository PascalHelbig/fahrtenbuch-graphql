const validateStringType = require('./ValidateStringType');

module.exports = validateStringType({
  name: 'Email',
  min: 4,
  max: 254,
  // http://stackoverflow.com/a/46181/761555
  regex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
});
