module.exports = {
  id: group => group.get('id'),
  name: group => group.get('name'),
  is_club: group => group.get('is_club'),
  boats: group => group.related('boats').fetch({ withRelated: 'owner' }),
  memberships: group => group.related('members').fetch(),
};
