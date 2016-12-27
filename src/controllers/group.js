const Group = require('../models/Group');

module.exports.all = () =>
  Group.fetchAll();

module.exports.findById = id =>
  new Group({ id }).fetch({ require: true });

module.exports.instanceof = group => group instanceof Group;