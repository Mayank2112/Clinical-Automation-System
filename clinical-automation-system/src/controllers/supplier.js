import { templatePaths } from 'config';
import PatientService from '../services/patient';
import SupplierService from '../services/supplier';
import renderPageWithMessage from '../helpers/responseRenderer';

export default class Supplier {
  /**
   * Register new user to database
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  static async registerSupplier(req, res) {
    const supplier = req.body;
    const result = await SupplierService.createSupplier(supplier);

    if (result) {
      return renderPageWithMessage(
        req,
        res,
        201,
        templatePaths.user.homepage,
        `${supplier.username} registered successfully. Login to continue`
      );
    }
    return renderPageWithMessage(
      req,
      res,
      400,
      templatePaths.user.register,
      'Username or email is already in use'
    );
  }

  /**
   * Redirect to dashboard page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  static redirectDashboard(req, res) {
    const details = {
      name: req.user.username,
      status: req.user.status
    };
    return renderPageWithMessage(req, res, 200, templatePaths.supplier.dashboard, null, details);
  }

  /**
   * Redirect to doctor details page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  static async redirectDetails(req, res) {
    const supplier = await SupplierService.findSupplier(req.user.username);
    return renderPageWithMessage(req, res, 200, templatePaths.supplier.details, null, supplier);
  }

  /**
   * Add additional information of supplier to database
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  static async addCredentials(req, res) {
    const supplier = req.body;
    supplier.email = req.user.username;
    const result = await SupplierService.addDetails(supplier);

    if (result) {
      req.user.status = 'pending';
      res.redirect('/supplier/details');
    }
    return renderPageWithMessage(
      req,
      res,
      400,
      templatePaths.supplier.details,
      'Data submitted is not correct'
    );
  }

  /**
   * Render order details to supplier
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  static async sendOrders(req, res) {
    const orders = await SupplierService.findOrdersBySupplier(req.user.id);
    return renderPageWithMessage(req, res, 200, templatePaths.supplier.orders, null, orders);
  }

  /**
   * Change order status to delivered
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  static async orderDelivered(req, res) {
    await SupplierService.changeOrderStatus(req.params.orderId, 'delivered');
    return res.redirect('/supplier/orders');
  }

  /**
   * Send information of patient to supplier
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  static async sendPatientInformation(req, res) {
    const patient = await PatientService.findPatientById(req.params.patientId);
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.supplier.patientInformation,
      null,
      patient
    );
  }
}
