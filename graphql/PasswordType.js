const validateStringType = require('./ValidateStringType');

module.exports = validateStringType({
  name: 'Password',
  description: 'min. 5 characters',
  min: 5,
  max: 254,
  regex: null,
});
