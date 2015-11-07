/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
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
    courses: [
      {
        name: 'string',
        resolved: 'integer'
      }
    ]

  }
};
