module.exports = function isAdmin(req, res, next) {
  if (!req.session.userId) {
    if (req.wantsJSON) {
      return res.forbidden('No acces.');
    }
    return res.redirect('/');
  }
  User.findOne(req.session.User)
    .exec(function (err, foundUser) {
      if (err) return res.negotiate(err);
      if (!foundUser) {
        if (req.wantsJSON) {
          return res.forbidden('No acces.');
        }
        return res.redirect('/');
      }
      if (foundUser.admin) {
        return next();
      } else {
        if (req.wantsJSON) {
          return res.forbidden('No acces.');
        }
        return res.redirect('/');
      }
    });
};
