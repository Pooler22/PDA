/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	showHomePage: function (req, res) {
		console.log("info: ", req.url);
		// public view
    if (!req.session.me) {
      return res.view('homepage');
    }

		// logged view
    User.findOne(req.session.me, function (err, user){
			//Error situation
			if (err) {
        return res.negotiate(err);
      }
			//Not found user
			if (!user) {
        sails.log.verbose('Sesja przypisana do nieistniejącego użytkownika, odśwież stronę.');
        return res.view('homepage');
      }


			// correct login
			return res.view('dashboard' , {
        me: {
          id: user.id,
          name: user.name,
          email: user.email,
          nick: user.nick
        }
      });

    });
  },
	showAboutPage: function (req, res) {
		if (!req.session.me) {
      return res.view('about');
    }
		User.findOne(req.session.me, function (err, user){
			return res.view('about' , {
				me: {
					id: user.id,
					name: user.name,
					email: user.email,
					nick: user.nick,
					courses: user.courses.name
				}
			});
		});
	}
};
