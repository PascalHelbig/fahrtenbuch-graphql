const jwt = require('jsonwebtoken');
const moment = require('moment');
const Promise = require('bluebird');
const User = require('../models/User');
const entryController = require('./entry');

const generateToken = (user) => {
  const payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix(),
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports.generateToken = generateToken;

module.exports.signup = user =>
  new User({
    name: user.name,
    email: user.email,
    password: user.password,
  }).save()
    .then(savedUser => ({ token: generateToken(savedUser), user: savedUser }))
    .catch((err) => {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        throw new Error('The email address you have entered is already associated with another account.');
      }
    });

module.exports.login = (email, password) =>
  new User({ email })
    .fetch({ require: true })
    .then(user =>
      user.comparePassword(password)
        .then((isMatch) => {
          if (!isMatch) {
            throw new Error('Invalid email or password');
          }
          return { token: generateToken(user), user };
        })
    )
    .catch(User.NotFoundError, () => { throw new Error('Emailaddress not found'); });

const me = (token) => {
  const id = jwt.verify(token, process.env.JWT_SECRET).sub;
  return new User({ id }).fetch({ require: true });
};
module.exports.me = me;

module.exports.addUserBoat = (token, boat) =>
  me(token).then(user => user.boats().create(boat));

const updateUserToAdmin = (user, group) =>
  user.groups().updatePivot(
    { is_admin: true },
    { query: { where: { group_id: group.id } } }
  );

module.exports.addGroup = (token, group) =>
  me(token).then(user =>
    user.groups().create(group).then(createdGroup =>
      updateUserToAdmin(user, createdGroup).then(() => createdGroup)
    )
  );

module.exports.instanceof = group => group instanceof User;

const addParticipations = (entry, participations) =>
  Promise.map(participations, participation =>
    entry.related('participations').create(
      { user_id: participation.user, boat_id: participation.boat }
    )
  );

// ToDo: Add Transaction:
module.exports.addEntry = (token, entry, participations) =>
  me(token).then(user => user.createdEntries().create(entry))
    .then(createdEntry => addParticipations(createdEntry, participations)
      .then(() => entryController.getEntry(createdEntry.get('id')))
    );
