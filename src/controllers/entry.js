const Entry = require('../models/Entry');

module.exports.getEntry = id =>
  new Entry({ id }).fetch({ require: true });
