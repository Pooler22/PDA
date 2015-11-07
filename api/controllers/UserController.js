/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: function (req, res) {
    User.findOne({ email: req.param('email') }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({
        error: function (err){
          return res.negotiate(err);
        },
        incorrect: function (){
          return res.notFound();
        },
        success: function (){
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
            User.create({
              name: req.param('name'),
              nick: req.param('nick'),
              email: req.param('email'),
              encryptedPassword: encryptedPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl
            }, function userCreated(err, newUser) {
              if (err) {
                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes)
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                  && err.invalidAttributes.email[0].rule === 'unique') {
                  return res.emailAddressInUse();
                }
                return res.negotiate(err);
              }
              req.session.me = newUser.id;
              return res.json({
                id: newUser.id
              });
            });
          }
        });
      }
    });
  },

  logout: function (req, res) {
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
