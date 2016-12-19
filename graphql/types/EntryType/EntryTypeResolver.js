module.exports = {
  id: entry => entry.get('id'),
  text: entry => entry.get('text'),
  start: entry => entry.get('start'),
  end: entry => entry.get('end'),
  sailed: entry => entry.get('sailed'),
  motor: entry => entry.get('motor'),
  creator: entry => entry.related('creator').fetch(),
  participations: entry => entry.related('participations').fetch(),
};
