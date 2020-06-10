import { filename } from 'config';
import renderPageWithMessage from '../helpers/responseRenderer';

/**
 * Logout user and redirect to homepage
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const logoutUser = (req, res) => {
  req.logout();
  if (req.app.locals.googleLogin) {
    req.app.locals.googleLogin = false;
    return res.redirect('/');
  }
  return renderPageWithMessage(res, 204, filename.user.homepage, 'Successfully Logout');
};

/**
 * Redirect to home page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectHome = (req, res) => {
  renderPageWithMessage(res, 200, filename.user.homepage, null);
};

/**
 * Redirect to login page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectLogin = (req, res) => {
  if (req.app.locals.loginFailure) {
    return renderPageWithMessage(res, 403, filename.user.login, 'Invalid Login credentials');
  }
  return renderPageWithMessage(res, 200, filename.user.login, null);
};

/**
 * Redirect to registeration page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectRegister = (req, res) => {
  renderPageWithMessage(res, 200, filename.user.register, null);
};

/**
 * Redirect to registeration page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const registerFailure = (req, res) => {
  renderPageWithMessage(res, 400, filename.user.register, 'Invalid Credentials');
};

/**
 * Set session variables and redirect to dashboard
 * @param {httpRequest} req
 * @param {htpResponse} res
 */
export const googleAuthenticationResponseHandler = (req, res) => {
  req.app.locals.googleLogin = true;
  if (req.user.type) {
    return res.redirect(`/${req.user.type}/dashboard`);
  }
  return renderPageWithMessage(
    res,
    403,
    filename.user.login,
    'Register your email first then you are eligible to login with google'
  );
};

/**
 * Send error response 404
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const resourceNotFoundError = (req, res) => {
  res.status(404);
  return res.end('Resource not found');
};

/**
 * Send error resopnse 405
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const methodNotAllowedError = (req, res) => {
  res.status(405);
  return res.end('Method not allowed');
};
