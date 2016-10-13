const { nodeDefinitions, fromGlobalId } = require('graphql-relay');
const userController = require('../controllers/user');
const groupController = require('../controllers/group');

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'User':
        return userController.findById(id);
      case 'Group':
        return groupController.findById(id);
      default:
        return null;
    }
  }
);

module.exports = { nodeInterface, nodeField };
