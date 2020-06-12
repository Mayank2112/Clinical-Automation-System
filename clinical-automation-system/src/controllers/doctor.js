import { templatePaths } from 'config';
import renderPageWithMessage from '../helpers/responseRenderer';
import { findPatientById, savePatientReport } from '../services/patient';
import {
  addDetails,
  findDoctorById,
  addDoctorSpecialization
} from '../services/doctor';

import {
  findAppointmentByDoctor,
  deleteAppointment,
  findAppointmentWithHistory,
  changeAppointmentStatus
} from '../services/appointment';

export default class Doctor {
  /**
   * Redirect to dashboard page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  redirectDashboard(req, res) {
    const details = {
      name: req.user.username,
      status: req.user.status
    };
    return renderPageWithMessage(req, res, 200, templatePaths.doctor.dashboard, null, details);
  }

  /**
   * Redirect to doctor details page
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  async redirectDetails(req, res) {
    const doctor = await findDoctorById(req.user.id);
    const details = doctor;
    if (doctor.specialization) {
      details.specialization = doctor.specialization.name;
    }
    return renderPageWithMessage(req, res, 200, templatePaths.doctor.details, null, details);
  }

  /**
   * Add additional information of doctor to database
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async addCredentials(req, res) {
    const doctor = req.body;
    doctor.email = req.user.username;
    doctor.experienceFrom = new Date(req.body.experienceFrom).getTime();
    const specialization = await addDoctorSpecialization(req.user.id, req.body.specialization);
    const result = await addDetails(doctor);

    if (result && specialization) {
      req.user.status = 'pending';
      return res.redirect('/doctor/details');
    }
    return renderPageWithMessage(
      req,
      res,
      400,
      templatePaths.doctor.details,
      'Data submitted is not correct'
    );
  }

  /**
   * Send list of pending appointment requests to doctor
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async sendAppointmentRequestList(req, res) {
    const appointments = await findAppointmentByDoctor(req.user.id, 'pending');

    if (appointments.length) {
      return renderPageWithMessage(
        req,
        res,
        200,
        templatePaths.doctor.appointmentRequest,
        null,
        appointments
      );
    }
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.doctor.appointmentRequest,
      'No Appointments yet'
    );
  }

  /**
   * Approve or reject appointment based on doctor decision
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async configureAppointmentRequest(req, res) {
    const appointmentOperation = {
      approved: changeAppointmentStatus,
      rejected: deleteAppointment
    };

    if (appointmentOperation[req.body.status]) {
      await appointmentOperation[req.body.status](req.body.appointmentId, 'pending', 'confirmed');
    }
    return res.redirect('/doctor/appointment-request');
  }

  /**
   * Send list of confirmed appointments to doctor
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async sendAppointmentList(req, res) {
    const appointments = await findAppointmentByDoctor(req.user.id, 'confirmed');

    if (appointments.length) {
      return renderPageWithMessage(
        req,
        res,
        200,
        templatePaths.doctor.appointment,
        null,
        appointments
      );
    }
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.doctor.appointment,
      'No Appointments yet'
    );
  }

  /**
   * Send information of patient to doctor
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async sendPatientInformation(req, res) {
    const patient = await findPatientById(req.params.patientId);
    const patientInformation = await findAppointmentWithHistory(req.params.patientId);
    return renderPageWithMessage(req,
      res,
      200,
      templatePaths.doctor.patientInformation,
      null,
      {
        patient,
        patientInformation
      });
  }

  /**
   * Send details of doctor
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async sendDoctorInformation(req, res) {
    const doctor = await findDoctorById(req.params.doctorId);
    return renderPageWithMessage(
      req,
      res,
      200,
      templatePaths.doctor.doctorInformation,
      null,
      doctor
    );
  }

  /**
   * Save report of patient to database
   * @param {httpRequest} req
   * @param {httpResponse} res
   */
  async saveReport(req, res) {
    const result = await savePatientReport(req.body);

    if (result) {
      return res.redirect('/doctor/appointment');
    }
    return renderPageWithMessage(
      req,
      res,
      500,
      templatePaths.doctor.appointment,
      'Some error occurs please try again'
    );
  }
}
