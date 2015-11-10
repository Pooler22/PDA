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
};
