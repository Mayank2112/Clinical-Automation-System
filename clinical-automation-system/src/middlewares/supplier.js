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
  return res.redirect('/supplier/dashboard');
};
