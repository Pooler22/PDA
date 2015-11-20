/**
 * User.js
 *
 * @description :: User model
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    nick: {
      type: 'string'
    },
    email: {
      type: 'string',
      email: {},
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string',
      required: true
    },
    courses: [{
      id: 'integer',
      resolved: 'integer'
    }],

    online: {
      type: 'boolean',
      defaultsTo: false
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },
  },

  toJSON: function () {
    var obj = this.toObject();
    delete obj.password;
    delete obj.confirmation;
    delete obj._csrf;
    delete obj.encryptedPassword;
    return obj;
  },
  beforeValidation: function (values, next) {

    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      } else if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
    next();
  },

  beforeCreate: function (values, next) {
    if (!values.encryptedPassword) {
      return next({
        err: ["Password doesn't match password confirmation."]
      });
    }

    require('bcrypt')
      .hash(values.encryptedPassword, 10, function passwordEncrypted(err, encryptedPassword) {
        if (err) return next(err);
        values.encryptedPassword = encryptedPassword;
        // values.online= true;
        next();
      });
  }
};
