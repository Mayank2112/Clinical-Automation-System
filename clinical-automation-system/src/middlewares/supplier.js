import { redirectDashboard } from '../controllers/supplier';

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

/**
 * Check credentials of doctor
 * @param {httpRequest} req
 * @param {httpResopnse} res
 * @param {Function} next
 */
export const checkCredentials = (req, res, next) => {
  const supplier = req.body;
  if (supplier.companyName && supplier.companyAddress) {
    return next();
  }
  return redirectDashboard(req, res);
};
