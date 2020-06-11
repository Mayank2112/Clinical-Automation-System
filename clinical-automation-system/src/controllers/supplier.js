import { filename } from 'config';
import renderPageWithMessage from '../helpers/responseRenderer';
import { createSupplier } from '../services/supplier';

/**
 * Register new user to database
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const registerSupplier = async (req, res) => {
  const supplier = req.body;

  const result = await createSupplier(supplier);
  if (result) {
    return renderPageWithMessage(
      req,
      res,
      201,
      filename.user.homepage,
      `${supplier.username} registered successfully. Login to continue`
    );
  }
  return renderPageWithMessage(
    req,
    res,
    400,
    filename.user.register,
    'Username or email is already in use'
  );
};

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => {
  const details = {
    name: req.user.username,
    status: req.user.status
  };
  return renderPageWithMessage(req, res, 200, filename.supplier.dashboard, null, details);
};
