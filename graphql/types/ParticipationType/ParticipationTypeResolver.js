module.exports = {
  id: participation => participation.get('id'),
  user: participation => participation.related('user').fetch(),
  boat: participation => participation.related('boat').fetch(),
  entry: participation => participation.related('entry').fetch(),
};
