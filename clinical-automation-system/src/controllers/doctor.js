import { filename } from 'config';
import { createDoctor, findDoctor, addDetails, findDoctorById } from '../services/doctor';
import renderPageWithMessage from '../helpers/responseRenderer';
import { findPatientById, savePatientReport } from '../services/patient';
import {
  findAppointmentByDoctor,
  deleteAppointment,
  findAppointmentWithHistory,
  changeAppointmentStatus
} from '../services/appointment';

/**
 * Register new doctor to database
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const registerDoctor = async (req, res) => {
  const doctor = req.body;
  doctor.dateOfBirth = new Date(req.body.dateOfBirth).getTime();

  const result = await createDoctor(doctor);
  if (result) {
    return renderPageWithMessage(res, 201, filename.user.homepage, `${doctor.username} registered successfully. Login to continue`);
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
  return renderPageWithMessage(res, 200, filename.doctor.dashboard, null, details);
};

/**
 * Redirect to doctor details page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDetails = async (req, res) => {
  const doctor = await findDoctor(req.user.username);
  const details = {
    name: doctor.name,
    email: doctor.email,
    status: doctor.status,
    degree: doctor.degree,
    dateOfBirth: doctor.dateOfBirth,
    gender: doctor.gender,
    startTime: doctor.startTime,
    endTime: doctor.endTime,
    experienceFrom: doctor.experienceFrom,
    appointmentFee: doctor.appointmentFee
  };
  return renderPageWithMessage(res, 200, filename.doctor.details, null, details);
};

/**
 * Add additional information of doctor to database
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const addCredentials = async (req, res) => {
  const doctor = req.body;
  doctor.email = req.user.username;
  doctor.experienceFrom = new Date(req.body.experienceFrom).getTime();

  const result = await addDetails(doctor);
  if (result) {
    req.session.passport.user.status = 'pending';
    res.redirect('/doctor/details');
  }
  return renderPageWithMessage(res, 400, filename.doctor.details, 'Data submitted is not correct');
};

/**
 * Send list of pending appointment requests to doctor
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendAppointmentRequestList = async (req, res) => {
  const doctor = await findDoctor(req.user.username);
  const appointments = await findAppointmentByDoctor(doctor.id, 'pending');

  if (appointments.length) {
    return renderPageWithMessage(res, 200, filename.doctor.appointmentRequest, null, appointments);
  }
  return renderPageWithMessage(res, 200, filename.doctor.appointmentRequest, 'No Appointments yet');
};

/**
 * Approve or reject appointment based on doctor decision
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const configureAppointmentRequest = async (req, res) => {
  const appointmentOperation = {
    approved: changeAppointmentStatus,
    rejected: deleteAppointment
  };

  if (appointmentOperation[req.body.status]) {
    await appointmentOperation[req.body.status](req.body.appointmentId, 'pending', 'confirmed');
  }
  return res.redirect('/doctor/appointment-request');
};

/**
 * Send list of confirmed appointments to doctor
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendAppointmentList = async (req, res) => {
  const doctor = await findDoctor(req.user.username);
  const appointments = await findAppointmentByDoctor(doctor.id, 'confirmed');

  if (appointments.length) {
    return renderPageWithMessage(res, 200, filename.doctor.appointment, null, appointments);
  }
  return renderPageWithMessage(res, 200, filename.doctor.appointment, 'No Appointments yet');
};

/**
 * Send information of patient to doctor
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendPatientInformation = async (req, res) => {
  const patient = await findPatientById(req.params.patientId);
  const patientInformation = await findAppointmentWithHistory(req.params.patientId);

  return renderPageWithMessage(
    res,
    200,
    filename.doctor.patientInformation,
    null,
    {
      patient,
      patientInformation
    }
  );
};

/**
 * Send details of doctor
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendDoctorInformation = async (req, res) => {
  const doctor = await findDoctorById(req.params.doctorId);
  return renderPageWithMessage(res, 200, filename.doctor.doctorInformation, null, doctor);
};

/**
 * Save report of patient to database
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const saveReport = async (req, res) => {
  const result = await savePatientReport(req.body);
  if (result) {
    return res.redirect('/doctor/appointment');
  }
  return renderPageWithMessage(res, 500, filename.doctor.appointment, 'Some error occurs please try again');
};
