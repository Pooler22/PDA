/**
 * ChaptersController
 *
 * @description :: Server-side logic for managing chapters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	new: function(req,res){
         res.view();
     },

 	create: function(req, res, next){
         var ret = true;
         Chapter.create(req.params.all(), function chapterCreated (err, chapters){
             if (err) {
                 ret = false;
                 req.session.flash = {
                     err: err
                 };
             }
 						return res.redirect('/course/show/' + req.param('owner'))
             //return res.json({ result: ret })
         });
     },

 		index: function(req,res, next) {
 	    Chapters.find(function foundChapters(err, chapters) {
 	      if (err) return next(err);
 	      res.view({
 	        chapters: chapters
 	      });
 	    });
 	  },

 	  edit: function(req,res,next){
 	    Chapters.findOne(req.params['id'], function foundBoard(err, chapters){
 	      if (err) return next(err);
 	      if (!chapters) return next('Brak takiej strony.');
 	      res.view({
 	        chapters: chapters
 	      });
 	    });
 	  },

 		update: function(req, res, next){
 	    Chapters.update(req.params['id'], req.params.all(), function updateBoard(err){
 	      if(err){
 	        return res.redirect('/course/show/' + req.param('owner'));
 	      }
 	      res.redirect('/course/show/' + req.param('owner'));
 	    });
 	  },

     destroy: function(req, res, next){
         var ret = false;

         try {
             Chapters.findOne(req.param('id'), function foundChapter(err, chapter){
                 if (err) return next(err);
                 if (!chapter) return res.json({ result: ret });
                 console.log(chapter);
                 Chapters.destroy(req.param('id'), function chapterDestroyed(err){
                     ret = true;
                 });
                 return res.json({ result: true })
             });

         } catch(e) {
             console.log(e);
             return res.json({ result: ret })
         }
     }
 };
