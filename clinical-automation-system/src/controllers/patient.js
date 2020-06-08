import moment from 'moment';
import { filename } from 'config';
import renderPageWithMessage from '../helpers/responseRenderer';
import { findDoctorByStatus } from '../services/doctor';
import { createAppointment, findAppointmentByPatient } from '../services/appointment';
import {
  createPatient,
  findMedicine,
  addOrder,
  findOrders,
  findPatientById
} from '../services/patient';

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
    return renderPageWithMessage(
      req,
      res,
      201,
      filename.user.homepage,
      `${patient.username} registered successfully. Login to continue`
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
export const redirectDashboard = (req, res) => renderPageWithMessage(
  req,
  res,
  200,
  filename.patient.dashboard
);

/**
 * Send list of doctors approved by admin
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendDoctorList = async (req, res) => {
  const doctors = await findDoctorByStatus('approved');
  if (doctors.length > 0) {
    return renderPageWithMessage(
      req,
      res,
      200,
      filename.patient.appointmentRequest,
      null,
      doctors
    );
  }
  return renderPageWithMessage(
    req,
    res,
    200,
    filename.patient.appointmentRequest,
    'No doctor registered successfully yet'
  );
};

/**
 * Create appointment and save to database
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const makeAppointmentRequest = async (req, res) => {
  const time = Number(req.body.time) % 100;
  const appointment = {
    patientId: req.user.id,
    doctorId: req.body.doctorId,
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
  return renderPageWithMessage(
    req,
    res,
    500,
    filename.patient.appointmentRequest,
    'Some error occurs please try again'
  );
};

/**
 * Redirect to patient details page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const sendPersonalDetail = async (req, res) => {
  const patient = await findPatientById(req.user.id);
  const details = {
    name: patient.name,
    email: patient.email,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender
  };
  return renderPageWithMessage(req, res, 200, filename.patient.details, null, details);
};

/**
 * Send list of appointment requests of patient
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendAppointmentList = async (req, res) => {
  const appointments = await findAppointmentByPatient(req.user.id);

  if (appointments.length) {
    return renderPageWithMessage(
      req,
      res,
      200,
      filename.patient.appointment,
      null,
      appointments
    );
  }
  return renderPageWithMessage(
    req,
    res,
    200,
    filename.patient.appointment,
    'No Appointments yet'
  );
};

/**
 * Render make orders page
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendMakeOrderPage = (req, res) => renderPageWithMessage(
  req,
  res,
  200,
  filename.patient.makeOrder,
  null,
  {
    message: null
  }
);

/**
 * Add new order to database
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const createOrder = async (req, res) => {
  const order = {
    patientId: req.user.id,
    quantity: req.body.quantity,
    medicineName: req.body.medicineName,
    supplierId: req.body.supplierId || null,
    status: 'confirmed',
    date: moment().format('l')
  };

  if (!req.body.supplierId) {
    const medicines = await findMedicine(req.body.medicineName);
    const medicine = medicines[0].dataValues;
    order.medicineId = medicine.id;
    order.amount = Number(order.quantity) * medicine.pricePerTablet;
  }

  const result = await addOrder(order);
  if (result) {
    res.status = 201;
    return res.redirect('/patient/orders');
  }
  return renderPageWithMessage(
    req,
    res,
    200,
    filename.patient.makeOrder,
    'Some error occurs. Try Again'
  );
};

/**
 * Render order details to patient
 * @param {httpRequest} req
 * @param {httpResponse} res
 */
export const sendOrderDetails = async (req, res) => {
  const orders = await findOrders(req.user.id);
  return renderPageWithMessage(req, res, 200, filename.patient.orders, null, orders);
};
