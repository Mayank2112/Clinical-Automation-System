import { isValidTypes } from '../helpers/validator';
import { redirectDashboard } from '../controllers/doctor';

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

/**
 * Check credentials of doctor
 * @param {httpRequest} req
 * @param {httpResopnse} res
 * @param {Function} next
 */
export const checkCredentials = (req, res, next) => {
  if (isValidTypes(req.body) && Number(req.body.startTime) < Number(req.body.endTime)) {
    return next();
  }
  return redirectDashboard(req, res);
};
