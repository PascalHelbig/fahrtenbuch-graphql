const groupController = require('../controllers/group');
const PublicGroup = require('./PublicGroupType').resolver;

module.exports = {
  Query: {
    groups: () => groupController.all(),
  },
  PublicGroup,
};
