/**
 * Pattern.js
 *
 * @description :: Pattern design model
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      required: true
    },
    shortdescription: {
      type: 'string',
      required: true
    },
    chapters: {
      collection: 'chapter',
      via: 'owner'
    }
  }
};
