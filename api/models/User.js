/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    // The user's full name
    name: {
      type: 'string',
      required: true
    },

    // The user's title at their job (or something)
    title: {
      type: 'string'
    },

    // The user's email address
    email: {
      type: 'string',
      email: {},
      required: true,
      unique: true
    },

    // The encrypted password for the user
    encryptedPassword: {
      type: 'string',
      required: true
    },

    // The timestamp when the the user last logged in
    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    // url for gravatar
    gravatarUrl: {
      type: 'string'
    }
  }
};