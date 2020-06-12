import moment from 'moment';
import { templatePaths } from 'config';
import DoctorService from '../services/doctor';
import AppointmentService from '../services/appointment';
import renderPageWithMessage from '../helpers/responseRenderer';

export default class Appointment {
  /**
   * Check types of data
   * @param {httpRequest} req
   * @param {httpResopnse} res
   * @param {Function} next
   */
  static async checkData(req, res, next) {
    if (req.body.doctorId && req.body.subject && !isNaN(req.body.time)) {
      const doctor = await DoctorService.findDoctorById(req.body.doctorId);
      if (req.body.time >= doctor.startTime && req.body.time <= doctor.endTime) {
        return next();
      }
      return renderPageWithMessage(
        req,
        res,
        403,
        templatePaths.patient.appointmentRequest,
        'Select appropriate time'
      );
    }
    return renderPageWithMessage(
      req,
      res,
      403,
      templatePaths.patient.appointmentRequest,
      'Request credentials are not correct'
    );
  }

  /**
   * Check appointment of doctor for given time
   * @param {httpRequest} req
   * @param {httpResopnse} res
   * @param {Function} next
   */
  static async checkDoctorAvailability(req, res, next) {
    const time = Number(req.body.time) % 100;
    const doctor = await DoctorService.findDoctorById(req.body.doctorId);

    if (doctor) {
      const appointment = await AppointmentService.findAppointmentByTime(req.body.doctorId, moment().format('l'), time);

      if (appointment) {
        return renderPageWithMessage(
          req,
          res,
          400,
          templatePaths.patient.appointmentRequest,
          'Doctor already has fixed appointment at given time. Please select another timing'
        );
      }
      return next();
    }
    return renderPageWithMessage(
      req,
      res,
      400,
      templatePaths.patient.appointmentRequest,
      'Please select valid doctor'
    );
  }

  /**
   * Change status of Appointment to completed
   * @param {httpRequest} req
   * @param {httpResopnse} res
   * @param {Function} next
   */
  static async completed(req, res, next) {
    const result = await AppointmentService.changeAppointmentStatus(req.body.appointmentId, 'confirmed', 'completed');

    if (result) {
      return next();
    }
    return renderPageWithMessage(
      req,
      res,
      403,
      templatePaths.doctor.appointment,
      'Request is not processed. Please enter correct credentials and try again'
    );
  }
}
