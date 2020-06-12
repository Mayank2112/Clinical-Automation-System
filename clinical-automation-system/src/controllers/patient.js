import moment from 'moment';
import { templatePaths } from 'config';
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

export default class Patient {
  /**
   * Register new user to database
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  async registerPatient(req, res) {
    const patient = req.body;
    patient.dateOfBirth = new Date(req.body.dateOfBirth).getTime();
    const result = await createPatient(patient);

    if (result) {
      return renderPageWithMessage(
        req,
        res,
        201,
        templatePaths.user.homepage,
        `${patient.username} registered successfully. Login to continue`
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
  redirectDashboard(req, res) {
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.patient.dashboard
    );
  }

  /**
   * Send list of doctors approved by admin
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async sendDoctorList(req, res) {
    const doctors = await findDoctorByStatus('approved');

    if (doctors.length > 0) {
      return renderPageWithMessage(
        req,
        res,
        200,
        templatePaths.patient.appointmentRequest,
        null,
        doctors
      );
    }
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.patient.appointmentRequest,
      'No doctor registered successfully yet'
    );
  }

  /**
   * Create appointment and save to database
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async makeAppointmentRequest(req, res) {
    const appointment = req.body;
    appointment.patientId = req.user.id;
    appointment.date = moment().format('l');
    appointment.status = 'pending';
    const result = await createAppointment(appointment);

    if (result) {
      return res.redirect('/patient/appointment');
    }
    return renderPageWithMessage(
      req,
      res,
      500,
      templatePaths.patient.appointmentRequest,
      'Some error occurs please try again'
    );
  }

  /**
   * Redirect to patient details page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  async sendPersonalDetail(req, res) {
    const patient = await findPatientById(req.user.id);
    return renderPageWithMessage(req, res, 200, templatePaths.patient.details, null, patient);
  }

  /**
   * Send list of appointment requests of patient
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async sendAppointmentList(req, res) {
    const appointments = await findAppointmentByPatient(req.user.id);

    if (appointments.length) {
      return renderPageWithMessage(
        req,
        res,
        200,
        templatePaths.patient.appointment,
        null,
        appointments
      );
    }
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.patient.appointment,
      'No Appointments yet'
    );
  }

  /**
   * Render make orders page
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  sendMakeOrderPage(req, res) {
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.patient.makeOrder,
      null,
      {
        message: null
      }
    );
  }

  /**
   * Add new order to database
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async createOrder(req, res) {
    const order = req.body;
    order.patientId = req.user.id;
    order.status = 'confirmed';
    order.date = moment().format('l');

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
      templatePaths.patient.makeOrder,
      'Some error occurs. Try Again'
    );
  }

  /**
   * Render order details to patient
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async sendOrderDetails(req, res) {
    const orders = await findOrders(req.user.id);
    return renderPageWithMessage(req, res, 200, templatePaths.patient.orders, null, orders);
  }
}
