/**
 * Exercises.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    owner: {
      model: 'chapter',
      required: true
    },
    order: {
      type: 'integer',
      required: true
    },
    content: {
      type: 'string'
    },
    codeconsole: {
      type: 'string'
    },
    test: {
      type: 'string'
    },
  }
};
