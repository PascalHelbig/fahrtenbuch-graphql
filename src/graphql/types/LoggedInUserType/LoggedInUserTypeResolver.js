module.exports = {
  user: user => user,
  email: user => user.get('email'),
  boats: user => user.related('boats').fetch({ withRelated: 'owner' }),
  availableBoats: user => user.availableBoats(),
  participations: user => user.related('participations').fetch(),
  memberships: user => user.related('groups').fetch(),
};
