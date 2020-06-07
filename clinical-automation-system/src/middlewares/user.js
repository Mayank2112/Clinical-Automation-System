import { filename } from 'config';
import { registerFailure } from '../controllers/user';
import { isValidEmail, isValidPassword, isValidNumber } from '../helpers/validator';
import { registerPatient } from '../controllers/patient';
import { registerDoctor } from '../controllers/doctor';
import { registerSupplier } from '../controllers/supplier';
import renderPageWithMessage from '../helpers/responseRenderer';
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

  return renderPageWithMessage(res, 403, filename.user.register, 'Please select profession');
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

export const checkUserCredentials = (req, res, next) => {
  if (isValidEmail(req.body.email)
    && isValidPassword(req.body.password)
    && isValidNumber(req.body.mobileNumber)) {
    return next();
  }
  return registerFailure(req, res);
};

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
