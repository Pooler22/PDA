/**
 * ExercisesController
 *
 * @description :: Server-side logic for managing exercises
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    Exercise.create(req.params.all(), function exerciseCreated(err, exercises) {
      if (err) {
        req.session.flash = {
          err: err
        };
      }
      return res.redirect('/course/edit/' + req.param('course'));
      //return res.json({ result: ret })
    });
  },

  index: function(req, res, next) {
    Exercise.find(function foundExercise(err, exercises) {
      if (err) return next(err);
      res.view({
        exercises: exercises
      });
    });
  },

  edit: function(req, res, next) {
    Exercise.findOne(req.params.id, function foundExercise(err, exercises) {
      if (err) return next(err);
      if (!exercises) return next('Brak takiej strony.');
      res.view({
        exercises: exercises
      });
    });
  },

  update: function(req, res, next) {
    Exercise.update(req.params.id, req.params.all(), function updateBoard(err) {
      if (err) {
        return res.json({
          result: true
        });
      }
      return res.json({
        result: true
      });
    });
  },

  destroy: function(req, res, next) {
    try {
      Exercise.findOne(req.param('id'), function foundExercise(err, exercise) {
        if (err) return next(err);
        if (!exercise) return res.json({
          result: false
        });
        Exercise.destroy(req.param('id'), function exerciseDestroyed(err) {
          if (err) return next(err);
          return res.json({
            result: true
          });
        });
      });

    } catch (e) {
      console.log(e);
      return res.json({
        result: ret
      });
    }
  }
};
