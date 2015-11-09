/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // This loads the sign-up page --> new.ejs
  'new': function(req, res) {
    res.view();
  },

  show: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },

  index: function(req, res, next) {
    User.find(function foundUsers(err, users) {
      if (err) return next(err);
      res.view({
        users: users
      });
    });
  },

  edit: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next(err);
      res.view({
        user: user
      });
    });
  },

  update: function(req, res, next) {
    var userObj = {
      name: req.param('name'),
      nick: req.param('nick'),
      email: req.param('email')
    };
    if (req.session.User.admin) {
      userObj = {
        admin: req.param('admin')
      };
    }


    User.update(req.param('id'), userObj, function userUpdated(err) {
      if (err) {
        return res.redirect('/user/edit/' + req.param('id'));
      }
      res.redirect('/user/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next(err);
      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);
        User.publishUpdate(
          user.id, {
            name: user.name,
            action: ' has been destroyed.'
          });
        User.publishDestroy(user.id);
      });
      res.redirect('/user');
    });
  },
  //TODO: login
  login: function(req, res) {
    sails.log.error("start");
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      sails.log.error("found");
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({
        error: function(err) {
          sails.log.error("1");
          return res.negotiate(err);
        },
        incorrect: function() {
          sails.log.error("2");
          return res.notFound();
        },
        success: function() {
          sails.log.error("3");
          user.lastLoggedIn = new Date();
          user.save(function(err, user) {
            if (err) return next(err);
            req.session.me = user.id;
            return res.ok();
          });
        }
      });
    });
  },
  //TODO: signup
  signup: function(req, res) {
    var Passwords = require('machinepack-passwords');
    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10,
    }).exec({
      error: function(err) {
        return res.negotiate(err);
      },
      success: function(encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function(err) {
            return res.negotiate(err);
          },
          success: function(gravatarUrl) {
            var userObj = {
              name: req.param('name'),
              nick: req.param('nick'),
              email: req.param('email'),
              encryptedPassword: req.param('password'),
              confirmation: req.param('confirmation'),
              lastLoggedIn: new Date()
            };
            User.create(userObj,
              function userCreated(err, newUser) {
                if (err) {
                  console.log("err: ", err);
                  console.log("err.invalidAttributes: ", err.invalidAttributes);
                  if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                    return res.emailAddressInUse();
                  }
                  return res.negotiate(err);
                }
                req.session.me = newUser.id;
                req.session.authenticated = true;
                req.session.User = newUser;
                newUser.online = true;
                if (err) return next(err);
                newUser.action = " signed-up and logged-in.";
                User.publishCreate(newUser);
                return res.json({
                  id: newUser.id
                });
              });
          }
        });
      }
    });
  },

  logout: function(req, res) {
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) {
        sails.log.verbose('Sesja przypisana do użytnowkika, który nieistnieje.');
        return res.backToHomePage();
      }
      req.session.me = null;
      return res.backToHomePage();
    });
  }
};
