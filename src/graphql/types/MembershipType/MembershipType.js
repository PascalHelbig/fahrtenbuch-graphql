// https://github.com/apollostack/graphql-server/issues/126#issuecomment-245833750
// eslint-disable-next-line no-use-before-define
module.exports = () => [MembershipType, UserType, GroupType];

const UserType = require('../UserType/UserType');
const GroupType = require('../GroupType/GroupType');

const MembershipType = `
  type Membership {
    user: User!
    group: Group!
    is_admin: Boolean!
  }
`;
