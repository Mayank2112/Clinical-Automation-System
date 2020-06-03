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
    return renderPageWithMessage(res, 201, filename.homepage, `${supplier.username} registered successfully. Login to continue`);
  }
  return renderPageWithMessage(res, 400, filename.register, 'Username or email is already in use');
};

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => {
  res.render(filename.supplier.dashboard, { username: req.user.username });
};
