/**
 * Checks user is logged in or not
 * @param {httpRequest} req
 * @param {httpResponse} res
 * @param {callback function} next
 */
export const isSupplierLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.user.type === 'supplier') {
    return next();
  }
  res.status(401);
  return res.redirect('/login');
};
