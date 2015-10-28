/**
 * PatternController
 *
 * @description :: Server-side logic for managing Patterns
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function(req,res){
    res.view();
  },

	create: function(req, res, next){
    //create Pattern with the params send from form -> new.ejs
    Pattern.create(req.params.all(), function PatternCreated (err, pattern){
      if (err) {
        req.session.flash = {
          err: err
        };
        //if error then redirect to add-Pattern form page
        return res.redirect('/pattern/new/');
      }
      //if successful then redirect to Pattern page
      return res.redirect('/pattern/');
    });
  },

  show: function(req, res, next){
    Pattern.findOne(req.params['id'], function foundPattern (err, pattern){
      if (err) return next(err);
      if (!Pattern) return next();
      res.view({
        pattern: pattern
      });
    });
  },

  index: function(req,res, next) {
    Pattern.find(function foundPatterns(err, pattern) {
      if (err) return next(err);
      res.view({
        patterns: pattern
      });
    });
  },

  edit: function(req,res,next){
    Pattern.findOne(req.params['id'], function foundPattern(err, pattern){
      if (err) return next(err);
      if (!pattern) return next('Brak takiego wzorca.');
      res.view({
        pattern: pattern
      });
    });
  },

  update: function(req, res, next){
    Pattern.update(req.params['id'], req.params.all(), function updatePattern(err){
      if(err){
        return res.redirect('/pattern/edit/' + req.param('id'));
      }
      res.redirect('/pattern/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next){
    Pattern.findOne(req.param('id'), function foundPattern(err, pattern){
      if (err) return next(err);
      if (!pattern) return next('Brak takiego wzorca.');
      Pattern.destroy(req.param('id'), function PatternDestroyed(err){
        if (err) return next(err);
      });
      res.redirect('/pattern/')
    });
  }

};
