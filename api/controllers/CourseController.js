/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    Course.create(req.params.all(), function ChapterCreated(err, course) {
      if (err) {
        req.session.flash = {
          err: err
        };
        return res.redirect('/course/edit/' + course.id);
      }
      return res.redirect('/course/edit/' + course.id);
    });
  },

  show: function(req, res, next) {
    sails.log.error('1');
    var chapters = null;
    var exercises = null;
    Chapter.find().where({
      owner: req.params.id
    }).exec(function foundChapter(err, data) {
      if (err) return next(err);
      chapters = data;

      Exercise.find().where({
        owner: data.params('id')
      }).exec(function foundChapter(err, data1) {
        if (err) return next(err);
        exercises = data1;
      });
    });

    Course.findOne(req.params.id, function foundCourse(err, course) {
      if (err) return next(err);
      if (!Course) return next();
      res.view({
        course: course,
        chapters: chapters,
        exercises: exercises
      });
    });
  },

  index: function(req, res, next) {
    sails.log.error('2');
    var condition;
    if (req.path.indexOf('design-pattern') === 1) {
      condition = 'Pattern design';
    } else if (req.path.indexOf('best-practice') === 1) {
      condition = 'Best practice';
    } else {
      return next(err);
    }
    sails.log.error(req.path);
    Course.find().where({
      type: condition
    }).exec(function foundCourse(err, courses) {
      if (err) return next(err);
      res.view({
        courses: courses
      });
    });
  },

  edit: function(req, res, next) {
    Course.findOne(req.params.id, function foundCourse(err, course) {
      if (err) return next(err);
      if (!course) return next(err);
      Chapter.find().where({
        owner: req.params.id
      }).exec(function foundChapter(err, chapters) {
        if (err) return next(err);
        var ids =[];
        for(var i = 0, len = chapters.length; i < len; i++){
          ids[i] = chapters[i].id;
        }
        Exercise.find().where({
          owner: ids
        }).exec(function foundChapter(err, exercises) {
          if (err) return next(err);
          res.view({
            course: course,
            chapters: chapters,
            exercises: exercises
          });
        });


      });
    });
  },

  update: function(req, res, next) {
    Course.update(req.params.id, req.params.all(), function updateCourse(err) {
      if (err) {
        return res.redirect('/course/edit/' + req.param('id'));
      }
      res.redirect('/course/edit/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {
    Course.findOne(req.param('id'), function foundCourse(err, course) {
      if (err) return next(err);
      if (!course) return next(err);
      Course.destroy(req.param('id'), function CourseDestroyed(err) {
        if (err) return next(err);
      });
      res.redirect('/');
    });
  }
};
