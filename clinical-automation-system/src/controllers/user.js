import { templatePaths } from 'config';
import renderPageWithMessage from '../helpers/responseRenderer';

export default class User {
  /**
   * Logout user and redirect to homepage
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  logoutUser(req, res) {
    req.logout();
    return renderPageWithMessage(
      req,
      res,
      204,
      templatePaths.user.homepage,
      'Successfully Logout'
    );
  }

  /**
   * Redirect to home page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  redirectHome(req, res) {
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.user.homepage
    );
  }

  /**
   * Redirect to login page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  redirectLogin(req, res) {
    if (req.app.locals.loginFailure) {
      return renderPageWithMessage(
        req,
        res,
        403,
        templatePaths.user.login,
        'Invalid Login credentials'
      );
    }
    return renderPageWithMessage(req, res, 200, templatePaths.user.login, null);
  }

  /**
   * Redirect to registeration page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  redirectRegister(req, res) {
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.user.register
    );
  }

  /**
   * Redirect to registeration page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  registerFailure(req, res) {
    return renderPageWithMessage(
      req,
      res,
      400,
      templatePaths.user.register,
      'Invalid Credentials'
    );
  }

  /**
   * Send error response 404
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  resourceNotFoundError(req, res) {
    res.status(404);
    return res.end('Resource not found');
  }

  /**
   * Send error resopnse 405
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  methodNotAllowedError(req, res) {
    res.status(405);
    return res.end('Method not allowed');
  }
}
