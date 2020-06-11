import { filename } from 'config';
import { findDoctorByStatus, approveDoctor, deleteDoctor } from '../services/doctor';
import { findSupplierByStatus, approveSupplier, deleteSupplier } from '../services/supplier';
import renderPageWithMessage from '../helpers/responseRenderer';
import { addNewMedicine } from '../services/admin';

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => renderPageWithMessage(
  req,
  res,
  200,
  filename.admin.dashboard
);

/**
 * Redirect to doctors details page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDoctorRequest = async (req, res) => {
  const doctors = await findDoctorByStatus('pending');
  return renderPageWithMessage(req, res, 200, filename.admin.doctorRequest, null, doctors);
};

/**
 * Approve or reject doctor based on admin decision
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const configureDoctor = async (req, res) => {
  const doctorOperation = {
    approved: approveDoctor,
    rejected: deleteDoctor
  };

  if (doctorOperation[req.body.status]) {
    await doctorOperation[req.body.status](req.body.doctorEmail);
  }
  return res.redirect('/admin/doctorRequest');
};

/**
 * Redirect to supplier details page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectSupplierRequest = async (req, res) => {
  const suppliers = await findSupplierByStatus('pending');
  return renderPageWithMessage(req, res, 200, filename.admin.supplierRequest, null, suppliers);
};

/**
 * Approve or reject supplier based on admin decision
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const configureSupplier = async (req, res) => {
  const supplierOperation = {
    approved: approveSupplier,
    rejected: deleteSupplier
  };

  if (supplierOperation[req.body.status]) {
    await supplierOperation[req.body.status](req.body.supplierEmail);
  }
  return res.redirect('/admin/supplierRequest');
};

/**
 * Render add medicine page
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendAddMedicinesPage = (req, res) => renderPageWithMessage(
  req,
  res,
  200,
  filename.admin.addMedicine
);

/**
 * Add medicine to database
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const addMedicine = async (req, res) => {
  const medicine = req.body;
  medicine.name = req.body.medicineName;

  const result = await addNewMedicine(medicine);
  if (result) {
    return renderPageWithMessage(
      req,
      res,
      201,
      filename.admin.addMedicine,
      'Added successfully'
    );
  }
  return renderPageWithMessage(
    req,
    res,
    403,
    filename.admin.addMedicine,
    'Medicine already available at store'
  );
};
