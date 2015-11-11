/**
* Pages.js
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
    order: {
      type: 'integer'
    },
    content: {
      type: 'string'
    },
    owner: {
      model: 'course',
      required: true
    },
    exercises: {
      collection: 'exercise',
      via: 'owner'
    }
  }
};
