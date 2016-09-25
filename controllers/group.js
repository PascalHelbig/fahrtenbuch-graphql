const Group = require('../models/Group');

module.exports.all = () =>
  Group.fetchAll();
