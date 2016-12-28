const Group = require('../models/Group');

module.exports.all = () =>
  Group.fetchAll();

module.exports.instanceof = group => group instanceof Group;
