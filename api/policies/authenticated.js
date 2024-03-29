/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {
  if (req.session.User) {
    return ok();
  } else {
    var requireLoginError = [{
      name: 'requireLogin',
      message: 'You must be signed in.'
    }];
    req.session.flash = {
      err: requireLoginError
    };
    res.redirect('/session/new');
    return;
  }
};
