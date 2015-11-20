/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  showHomePage: function (req, res) {
    if (!req.session.authenticated) {
      return res.view('static/homepage');
    }
    User.findOne(req.session.authenticated, function (err, user) {
      if (err) {
        return res.negotiate(err);
      }
      if (!user) {
        return res.view('static/homepage');
      }
      return res.view('user/dashboard', {
        me: {
          name: user.name
        }
      });
    });
  },

  showAboutPage: function (req, res) {
    return res.view('static/about');
  }
};
