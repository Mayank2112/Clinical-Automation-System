import moment from 'moment';
import { filename } from 'config';
import { createPatient, findPatient } from '../services/patient';
import renderPageWithMessage from '../helpers/responseRenderer';
import { findDoctorByStatus, findDoctor } from '../services/doctor';
import { createAppointment, findAppointmentByPatient } from '../services/appointment';

/**
 * Register new user to database
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const registerPatient = async (req, res) => {
  const patient = req.body;
  patient.dateOfBirth = new Date(req.body.dateOfBirth).getTime();

  const result = await createPatient(patient);
  if (result) {
    return renderPageWithMessage(res, 201, filename.user.homepage, `${patient.username} registered successfully. Login to continue`);
  }
  return renderPageWithMessage(res, 400, filename.user.register, 'Username or email is already in use');
};

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => {
  res.render(filename.patient.dashboard, { username: req.user.username });
};

/**
 * Send list of doctors approved by admin
 * @param {httpRequest} req 
 * @param {httpResponse} res 
 */
export const sendDoctorList = async (req, res) => {
  const doctors = await findDoctorByStatus('approved');
  if (doctors.length > 0) {
    return renderPageWithMessage(res, 200, filename.patient.appointmentRequest, null, doctors);
  }
  return renderPageWithMessage(res, 200, filename.patient.appointmentRequest, 'No doctor registered successfully yet');
};

/**
 * Create appointment and save to database
 * @param {httpRequest} req 
 * @param {httpResponse} res 
 */
export const makeAppointmentRequest = async (req, res) => {
  const time = Number(req.body.time) % 100;
  const doctor = await findDoctor(req.body.doctorEmail);
  const patient = await findPatient(req.user.username);

  const appointment = {
    patientId: patient.id,
    doctorId: doctor.id,
    subject: req.body.subject,
    description: req.body.description || null,
    date: moment().format('l'),
    time: time,
    status: 'pending'
  };

  const result = await createAppointment(appointment);
  if (result) {
    res.redirect('/patient/appointment');
  }
  return renderPageWithMessage(res, 500, filename.patient.appointmentRequest, 'Some error occurs please try again');
};

/**
 * Send list of appointment requests of patient
 * @param {httpRequest} req 
 * @param {httpResponse} res 
 */
export const sendAppointmentList = async (req, res) => {
  const patient = await findPatient(req.user.username);
  const appointments = await findAppointmentByPatient(patient.id);

  if (appointments.length) {
    return renderPageWithMessage(res, 200, filename.patient.appointment, null, appointments);
  }
  return renderPageWithMessage(res, 200, filename.patient.appointment, 'No Appointments yet');
};
