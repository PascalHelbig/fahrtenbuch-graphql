// var crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const bookshelf = require('../config/bookshelf');
const Promise = require('bluebird');
require('./Boat');
require('./Group');
// const Groups = require('./Group');
// require('./Participation');

const User = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,
  boats() {
    return this.morphMany('Boat', 'owner');
  },
  groups() {
    return this.belongsToMany('Group', 'memberships').withPivot(['is_admin']);
  },
  // createdEntries() {
  //   return this.hasMany('Entry', 'creator');
  // },
  // participations() {
  //   return this.hasMany('Participation');
  // },

  initialize() { this.on('saving', this.hashPassword, this); },

  hashPassword: (model, attrs, options) => {
    const password = options.patch ? attrs.password : model.get('password');
    if (!password) { return null; }
    return new Promise(resolve =>
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(password, salt, null, (err2, hash) => {
          if (options.patch) {
            // ToDo: Fix this eslint error
            // eslint-disable-next-line no-param-reassign
            attrs.password = hash;
          }
          model.set('password', hash);
          resolve();
        })
      )
    );
  },

  comparePassword(password) {
    const model = this;
    return new Promise((resolve, reject) =>
      bcrypt.compare(password, model.get('password'), (err, isMatch) =>
        (err ? reject(err) : resolve(isMatch))
      )
    );
  },

  hidden: ['password', 'passwordResetToken', 'passwordResetExpires'],

  // virtuals: {
  //   gravatar: function() {
  //     if (!this.get('email')) {
  //       return 'https://gravatar.com/avatar/?s=200&d=retro';
  //     }
  //     var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
  //     return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
  //   }
  // }
});

module.exports = User;
