module.exports = {
  id: group => group.get('id'),
  name: group => group.get('name'),
  is_club: group => group.get('is_club'),
  members: group => group.related('members').fetch(),
  boats: group => group.related('boats').fetch({ withRelated: 'owner' }),
};
