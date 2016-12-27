module.exports = {
  id: boat => boat.get('id'),
  name: boat => boat.get('name'),
  owner: boat => boat.related('owner'),
};
