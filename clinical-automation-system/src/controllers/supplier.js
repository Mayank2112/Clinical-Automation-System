import { filename } from 'config';
import { createSupplier, findSupplier, addDetails } from '../services/supplier';
import renderPageWithMessage from '../helpers/responseRenderer';

/**
 * Register new user to database
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const registerSupplier = async (req, res) => {
  const supplier = req.body;

  const result = await createSupplier(supplier);
  if (result) {
    return renderPageWithMessage(res, 201, filename.user.homepage, `${supplier.username} registered successfully. Login to continue`);
  }
  return renderPageWithMessage(res, 400, filename.user.register, 'Username or email is already in use');
};

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => {
  const details = {
    name: req.user.username,
    status: req.session.passport.user.status
  };
  renderPageWithMessage(res, 200, filename.supplier.dashboard, null, details);
};

/**
 * Redirect to doctor details page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDetails = async (req, res) => {
  const supplier = await findSupplier(req.user.username);
  const details = {
    name: supplier.name,
    email: supplier.email,
    status: supplier.status,
    companyName: supplier.companyName,
    companyAddress: supplier.companyAddress,
    mobileNumber: supplier.mobileNumber
  };
  return renderPageWithMessage(res, 200, filename.supplier.details, null, details);
};

/**
 * Add additional information of supplier to database
 * @param {httpRequest} req 
 * @param {httpResponse} res 
 */
export const addCredentials = async (req, res) => {
  const supplier = req.body;
  supplier.email = req.user.username;

  const result = await addDetails(supplier);
  if (result) {
    req.session.passport.user.status = 'pending';
    res.redirect('/supplier/details');
  }
  return renderPageWithMessage(res, 400, filename.supplier.details, 'Data submitted is not correct');
};
