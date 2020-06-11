/**
 * Checks doctor is logged in or not
 * @param {httpRequest} req
 * @param {httpResponse} res
 * @param {callback function} next
 */
export const isDoctorLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.user.type === 'doctor') {
    return next();
  }
  res.status(401);
  return res.redirect('/login');
};
