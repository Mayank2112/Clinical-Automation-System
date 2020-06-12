export default class LoggedIn {
  /**
   * Checks admin is logged in or not
   * @param {httpRequest} req
   * @param {httpResponse} res
   * @param {callback function} next
  */
  admin(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'admin') {
      return next();
    }
    res.status(401);
    return res.redirect('/login');
  }

  /**
   * Checks doctor is logged in or not
   * @param {httpRequest} req
   * @param {httpResponse} res
   * @param {callback function} next
   */
  doctor(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'doctor') {
      return next();
    }
    res.status(401);
    return res.redirect('/login');
  }

  /**
   * Checks patient is logged in or not
   * @param {httpRequest} req
   * @param {httpResponse} res
   * @param {callback function} next
   */
  patient(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'patient') {
      return next();
    }
    res.status(401);
    return res.redirect('/login');
  }

  /**
   * Checks supplier is logged in or not
   * @param {httpRequest} req
   * @param {httpResponse} res
   * @param {callback function} next
   */
  supplier(req, res, next) {
    if (req.isAuthenticated() && req.user.type === 'supplier') {
      return next();
    }
    res.status(401);
    return res.redirect('/login');
  }
}
