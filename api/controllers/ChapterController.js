/**
 * ChapterController
 *
 * @description :: Server-side logic for managing chapters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function (req, res) {
    res.view();
  },

  create: function (req, res, next) {
    Chapter.create(req.params.all(), function chapterCreated(err) {
      if (err) return next(err);
      return res.json({
        id: req.param('owner')
      });
    });
  },

  index: function (req, res, next) {
    Chapter.find(function foundChapter(err, chapters) {
      if (err) return next(err);
      res.view({
        chapters: chapters
      });
    });
  },

  edit: function (req, res, next) {
    Chapter.findOne(req.params.id, function foundBoard(err, chapters) {
      if (err) return next(err);
      if (!chapters) return next(err);
      res.view({
        chapters: chapters
      });
    });
  },

  update: function (req, res, next) {
    Chapter.update(req.params.id, req.params.all(), function updateBoard(err) {
      if (err) return next(err);
      res.json({
        result: true
      });
      //res.redirect('/course/edit/' + req.param('owner'));
    });
  },

  destroy: function (req, res, next) {
    Chapter.findOne(req.param('id'), function foundChapter(err, chapter) {
      if (err) return next(err);
      if (!chapter) return res.json({
        result: false
      });
      Chapter.destroy(req.param('id'), function chapterDestroyed(err) {
        if (err) return next(err);
        return res.json({
          result: true
        });
      });
    });
  }
};
