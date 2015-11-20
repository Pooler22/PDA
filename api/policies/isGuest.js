module.exports = function (req, res, next) {
  if (!req.session.User) {
    return next();
  }

  if (req.wantsJSON) {
    return res.forbidden('No acces.');
  }

  return res.redirect('/');
};
