const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../models/Users');

const SECRET = 'SECRET!!!'

const generateToken = user => {
  const payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix(),
  };
  return jwt.sign(payload, SECRET);
}

module.exports.signup = user =>
  new User({
    name: user.name,
    email: user.email,
    password: user.password,
  }).save()
    .then(savedUser => ({ token: generateToken(savedUser), user: savedUser.toJSON() }))
    .catch(err => {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        throw new Error('The email address you have entered is already associated with another account.');
      }
    });
