/**
 * Usage:
 *
 * ```
 * res.emailAddressInUse();
 * ```
 *
 */

module.exports = function emailAddressInUse() {

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;

  return res.send(409, 'Ten adres email jest już zarejestrowany.');

  // if (err.invalidAttributes.email) {
  //   return res.send(409, 'Email address is already taken by another user, please try again.');
  // }
  //
  // if (err.invalidAttributes.username) {
  //   return res.send(409, 'Username is already taken by another user, please try again.');
  // }
};
