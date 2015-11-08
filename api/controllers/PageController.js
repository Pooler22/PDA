/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  showHomePage: function(req, res) {
    if (!req.session.me) {
      return res.view('static/homepage');
    }

    User.findOne(req.session.me, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }
      if (!user) {
        sails.log.verbose('Not found user.');
        return res.view('static/homepage');
      }

      return res.view('dashboard', {
        me: {
          id: user.id,
          name: user.name,
          email: user.email,
          nick: user.nick
        }
      });
    });
  },
  showAboutPage: function(req, res) {
    return res.view('static/about');
  }
};
