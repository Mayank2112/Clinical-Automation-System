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
  if (req.body.profession === 'patient') {
    return registerPatient(req, res);
  }

  if (req.body.profession === 'doctor') {
    return registerDoctor(req, res);
  }

  if (req.body.profession === 'supplier') {
    return registerSupplier(req, res);
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
  next();
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
  next();
};

export const checkUserCredentials = (req, res, next) => {
  if (regEx.email.test(req.body.email)
    && regEx.password.test(req.body.password)
    && regEx.phone.test(req.body.mobileNumber)) {
    return next();
  }
  return registerFailure(req, res);
};

export const redirectUserToProfessionLogin = (req, res) => {
  if (req.body.profession === 'admin') {
    return adminLocalAuthentication(req, res);
  }

  if (req.body.profession === 'doctor') {
    return doctorLocalAuthentication(req, res);
  }

  if (req.body.profession === 'patient') {
    return patientLocalAuthentication(req, res);
  }

  if (req.body.profession === 'supplier') {
    return supplierLocalAuthentication(req, res);
  }
  return setLoginFailure(req, res);
};
