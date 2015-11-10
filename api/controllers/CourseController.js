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
        return res.redirect('/course/new/');
      }
      return res.redirect('/course/edit/' + course.id);
    });
  },

  show: function(req, res, next) {
    Course.findOne(req.params.id, function foundCourse(err, course) {
      if (err) return next(err);
      if (!Course) return next();

      var chapters = null;
      Chapter.find().where({owner: req.params.id}).exec(function foundChapter(err, data) {
          if (err) return next(err);
          chapters = data;
      });

      res.view({
        course: course,
        chapters: chapters
      });
    });
  },

  index: function(req, res, next) {
    Course.find(function foundCourse(err, courses) {
      if (err) return next(err);
      res.view({
        courses: courses
      });
    });
  },

  edit: function(req, res, next) {
    var chapters = null;
    Chapter.find().where({owner: req.params.id}).exec(function foundChapter(err, data) {
        if (err) return next(err);
        chapters = data;
    });

    Course.findOne(req.params.id, function foundCourse(err, course) {
      if (err) return next(err);
      if (!course) return next(err);
      res.view({
        course: course,
        chapters: chapters
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
      res.redirect('/course/');
    });
  }

};
