import { filename } from 'config';
import { registerFailure } from '../controllers/user';
import { registerPatient } from '../controllers/patient';
import { registerDoctor } from '../controllers/doctor';
import { registerSupplier } from '../controllers/supplier';
import renderPageWithMessage from '../helpers/responseRenderer';
import regEx from '../helpers/regEx';
import {
  adminLocalAuthentication,
  doctorLocalAuthentication,
  patientLocalAuthentication,
  supplierLocalAuthentication
} from './authentication';

/**
 * Register new user to database
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const registerUser = (req, res) => {
  const registration = {
    doctor: registerDoctor,
    patient: registerPatient,
    supplier: registerSupplier
  };

  if (registration[req.body.profession]) {
    return registration[req.body.profession](req, res);
  }
  return renderPageWithMessage(
    req,
    res,
    403,
    filename.user.register,
    'Please select profession'
  );
};

/**
 * Destroy the session of user
 * @param {httpRequest} req
 * @param {httpResponse} res
 * @param {callback function} next
 */
export const destroySession = (req, res, next) => {
  req.session.destroy();
  return next();
};

/**
 * Update loginFailure local variable
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const setLoginFailure = (req, res) => {
  req.app.locals.loginFailure = true;
  res.redirect('/login');
};

/**
 * Reset loginFailure local variable
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const resetLoginFailure = (req, res, next) => {
  req.app.locals.loginFailure = false;
  return next();
};

/**
 * Check user credentials on registration
 * @param {httpRequest} req
 * @param {httpResopnse} res
 * @param {Function} next
 */
export const checkUserCredentials = (req, res, next) => {
  if (regEx.email.test(req.body.email)
    && regEx.password.test(req.body.password)
    && regEx.phone.test(req.body.mobileNumber)) {
    return next();
  }
  return registerFailure(req, res);
};

/**
 * Set appropriate authentication strategy based on user profile
 * @param {httpRequest} req
 * @param {httpResopnse} res
 * @param {Function} next
 */
export const redirectUserToProfessionLogin = (req, res) => {
  const authentication = {
    admin: adminLocalAuthentication,
    doctor: doctorLocalAuthentication,
    patient: patientLocalAuthentication,
    supplier: supplierLocalAuthentication
  };
  req.app.locals.userType = req.body.profession;

  if (authentication[req.body.profession]) {
    return authentication[req.body.profession](req, res);
  }
  return setLoginFailure(req, res);
};
