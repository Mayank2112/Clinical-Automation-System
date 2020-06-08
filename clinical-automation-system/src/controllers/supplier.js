import { filename } from 'config';
import renderPageWithMessage from '../helpers/responseRenderer';
import { findPatientById } from '../services/patient';
import {
  createSupplier,
  findSupplier,
  addDetails,
  findOrdersBySupplier,
  changeOrderStatus
} from '../services/supplier';

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
  return renderPageWithMessage(req, res, 200, filename.supplier.details, null, details);
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
    req.user.status = 'pending';
    res.redirect('/supplier/details');
  }
  return renderPageWithMessage(
    req,
    res,
    400,
    filename.supplier.details,
    'Data submitted is not correct'
  );
};

/**
 * Render order details to supplier
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendOrders = async (req, res) => {
  const orders = await findOrdersBySupplier(req.user.id);
  return renderPageWithMessage(req, res, 200, filename.supplier.orders, null, orders);
};

/**
 * Change order status to delivered
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const orderDelivered = async (req, res) => {
  await changeOrderStatus(req.params.orderId, 'delivered');
  return res.redirect('/supplier/orders');
};

/**
 * Send information of patient to supplier
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendPatientInformation = async (req, res) => {
  const patient = await findPatientById(req.params.patientId);
  return renderPageWithMessage(
    req,
    res,
    200,
    filename.supplier.patientInformation,
    null,
    patient
  );
};
