const LoginMutation = require('./LoginMutation');
const SignupMutation = require('./SignupMutation');
const AddGroupMutation = require('./AddGroupMutation');
const AddUserBoatMutation = require('./AddUserBoatMutation');
const AddEntryMutation = require('./AddEntryMutation');

module.exports.schema = `
  type Mutation {
    ${LoginMutation.schema}
    ${SignupMutation.schema}
    ${AddGroupMutation.schema}
    ${AddUserBoatMutation.schema}
    ${AddEntryMutation.schema}
  }`;

module.exports.usedTypes = () => [LoginMutation.usedTypes, SignupMutation.usedTypes,
  AddGroupMutation.usedTypes, AddUserBoatMutation.usedTypes, AddEntryMutation.usedTypes];
