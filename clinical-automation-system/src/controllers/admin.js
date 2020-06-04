import { filename } from 'config';
import { findDoctorByStatus, approveDoctor, deleteDoctor } from '../services/doctor';

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => {
  res.render(filename.admin.dashboard, { username: req.user.username });
};

/**
 * Redirect to doctors details page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDoctorRequest = async (req, res) => {
  const doctors = await findDoctorByStatus('pending');
  const details = { doctors };
  return res.render(filename.admin.doctorRequest, { details });
};

export const configureDoctor = async (req, res) => {
  const doctorOperation = {
    approved: approveDoctor,
    rejected: deleteDoctor
  };
  if (doctorOperation[req.body.status]) {
    await doctorOperation[req.body.status](req.body.doctorEmail);
  }
  res.redirect('/admin/doctorRequest');
};
