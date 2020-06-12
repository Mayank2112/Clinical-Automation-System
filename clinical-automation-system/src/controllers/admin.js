import { templatePaths } from 'config';
import AdminService from '../services/admin';
import DoctorService from '../services/doctor';
import SupplierService from '../services/supplier';
import renderPageWithMessage from '../helpers/responseRenderer';

export default class Admin {
  /**
   * Redirect to dashboard page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  static redirectDashboard(req, res) {
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.admin.dashboard
    );
  }

  /**
   * Redirect to doctors details page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  static async redirectDoctorRequest(req, res) {
    const doctors = await DoctorService.findDoctorByStatus('pending');
    return renderPageWithMessage(req, res, 200, templatePaths.admin.doctorRequest, null, doctors);
  }

  /**
   * Approve or reject doctor based on admin decision
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  static async configureDoctor(req, res) {
    const doctorOperation = {
      approved: DoctorService.approveDoctor,
      rejected: DoctorService.deleteDoctor
    };

    if (doctorOperation[req.body.status]) {
      await doctorOperation[req.body.status](req.body.doctorEmail);
    }
    return res.redirect('/admin/doctor-request');
  }

  /**
   * Redirect to supplier details page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  static async redirectSupplierRequest(req, res) {
    const suppliers = await SupplierService.findSupplierByStatus('pending');
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.admin.supplierRequest,
      null,
      suppliers
    );
  }

  /**
   * Approve or reject supplier based on admin decision
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  static async configureSupplier(req, res) {
    const supplierOperation = {
      approved: SupplierService.approveSupplier,
      rejected: SupplierService.deleteSupplier
    };

    if (supplierOperation[req.body.status]) {
      await supplierOperation[req.body.status](req.body.supplierEmail);
    }
    return res.redirect('/admin/supplier-request');
  }

  /**
   * Render add medicine page
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  static sendAddMedicinesPage(req, res) {
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.admin.addMedicine
    );
  }

  /**
   * Add medicine to database
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  static async addMedicine(req, res) {
    const medicine = req.body;
    medicine.name = req.body.medicineName;

    const result = await AdminService.addNewMedicine(medicine);
    if (result) {
      return renderPageWithMessage(
        req,
        res,
        201,
        templatePaths.admin.addMedicine,
        'Added successfully'
      );
    }
    return renderPageWithMessage(
      req,
      res,
      403,
      templatePaths.admin.addMedicine,
      'Medicine already available at store'
    );
  }
}
