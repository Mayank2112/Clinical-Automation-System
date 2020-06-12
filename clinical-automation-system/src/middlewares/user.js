import { templatePaths } from 'config';
import User from '../controllers/user';
import Register from '../controllers/registration';
import renderPageWithMessage from '../helpers/responseRenderer';
import authentication from './authentication';
import regEx from '../helpers/regEx';

export default class UserMiddleware {
  /**
   * Register new user to database
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  registerUser(req, res) {
    const register = new Register();

    if (register[req.body.profession]) {
      return register[req.body.profession](req, res);
    }
    return renderPageWithMessage(
      req,
      res,
      403,
      templatePaths.user.register,
      'Please select profession'
    );
  }

  /**
   * Destroy the session of user
   * @param {httpRequest} req
   * @param {httpResponse} res
   * @param {callback function} next
   */
  destroySession(req, res, next) {
    req.session.destroy();
    return next();
  }

  /**
   * Update loginFailure local variable
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  setLoginFailure(req, res) {
    req.app.locals.loginFailure = true;
    res.redirect('/login');
  }

  /**
   * Reset loginFailure local variable
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  resetLoginFailure(req, res, next) {
    req.app.locals.loginFailure = false;
    return next();
  }

  /**
   * Check user credentials on registration
   * @param {httpRequest} req
   * @param {httpResopnse} res
   * @param {Function} next
   */
  checkUserCredentials(req, res, next) {
    if (regEx.email.test(req.body.email)
      && regEx.password.test(req.body.password)
      && regEx.phone.test(req.body.mobileNumber)) {
      return next();
    }
    const user = new User();
    return user.registerFailure(req, res);
  }

  /**
   * Set appropriate authentication strategy based on user profile
   * @param {httpRequest} req
   * @param {httpResopnse} res
   * @param {Function} next
   */
  redirectUserToProfessionLogin(req, res) {
    req.app.locals.userType = req.body.profession;

    if (authentication[req.body.profession]) {
      return authentication[req.body.profession](req, res);
    }
    return this.setLoginFailure(req, res);
  }
}
