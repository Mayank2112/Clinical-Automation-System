
/**
 * Checks patient is logged in or not
 * @param {httpRequest} req
 * @param {httpResponse} res
 * @param {callback function} next
 */
export const isPatientLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.session.passport.user.type === 'patient') {
    return next();
  }
  res.status(401);
  return res.redirect('/login');
};
