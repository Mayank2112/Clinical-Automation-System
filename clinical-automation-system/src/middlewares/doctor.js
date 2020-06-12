import { isValidTypes } from '../helpers/validator';

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
  return res.redirect('/doctor/dashboard');
};
