/**
 * PatternController
 *
 * @description :: Server-side logic for managing Patterns
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    Pattern.create(req.params.all(), function PatternCreated(err, pattern) {
      if (err) {
        req.session.flash = {
          err: err
        };
        return res.redirect('/pattern/new/');
      }
      return res.redirect('/pattern/edit/' + pattern.id);
    });
  },

  show: function(req, res, next) {
    Pattern.findOne(req.params.id, function foundPattern(err, pattern) {
      if (err) return next(err);
      if (!Pattern) return next();
      if (req.session.me) {
        User.findOne(req.session.me, function(err, user) {
          user.courses = {
            name: 'string',
            resolved: 0
          };
        });
      }
      res.view({
        pattern: pattern
      });
    });
  },

  index: function(req, res, next) {
    Pattern.find(function foundPatterns(err, patterns) {
      if (err) return next(err);
      res.view({
        patterns: patterns
      });
    });
  },

  edit: function(req, res, next) {
    Pattern.findOne(req.params.id, function foundPattern(err, pattern) {
      if (err) return next(err);
      if (!pattern) return next(err);
      res.view({
        pattern: pattern
      });
    });
  },

  update: function(req, res, next) {
    Pattern.update(req.params.id, req.params.all(), function updatePattern(err) {
      if (err) {
        return res.redirect('/pattern/edit/' + req.param('id'));
      }
      res.redirect('/pattern/edit/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {
    Pattern.findOne(req.param('id'), function foundPattern(err, pattern) {
      if (err) return next(err);
      if (!pattern) return next(err);
      Pattern.destroy(req.param('id'), function PatternDestroyed(err) {
        if (err) return next(err);
      });
      res.redirect('/pattern/');
    });
  }

};
