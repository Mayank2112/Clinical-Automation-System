import { templatePaths } from 'config';
import { findDoctorByStatus, approveDoctor, deleteDoctor } from '../services/doctor';
import { findSupplierByStatus, approveSupplier, deleteSupplier } from '../services/supplier';
import { addNewMedicine } from '../services/admin';
import renderPageWithMessage from '../helpers/responseRenderer';

export default class Admin {
  /**
   * Redirect to dashboard page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  redirectDashboard(req, res) {
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
  async redirectDoctorRequest(req, res) {
    const doctors = await findDoctorByStatus('pending');
    return renderPageWithMessage(req, res, 200, templatePaths.admin.doctorRequest, null, doctors);
  }

  /**
   * Approve or reject doctor based on admin decision
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async configureDoctor(req, res) {
    const doctorOperation = {
      approved: approveDoctor,
      rejected: deleteDoctor
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
  async redirectSupplierRequest(req, res) {
    const suppliers = await findSupplierByStatus('pending');
    return renderPageWithMessage(req, res, 200, templatePaths.admin.supplierRequest, null, suppliers);
  }

  /**
   * Approve or reject supplier based on admin decision
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async configureSupplier(req, res) {
    const supplierOperation = {
      approved: approveSupplier,
      rejected: deleteSupplier
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
  sendAddMedicinesPage(req, res) {
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
  async addMedicine(req, res) {
    const medicine = req.body;
    medicine.name = req.body.medicineName;

    const result = await addNewMedicine(medicine);
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
