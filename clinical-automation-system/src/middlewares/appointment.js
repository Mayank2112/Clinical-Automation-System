import moment from 'moment';
import { filename } from 'config';
import renderPageWithMessage from '../helpers/responseRenderer';
import { findDoctorById } from '../services/doctor';
import { findAppointmentByTime, changeAppointmentStatus } from '../services/appointment';

/**
 * Check types of data
 * @param {httpRequest} req
 * @param {httpResopnse} res
 * @param {Function} next
 */
export const checkAppointmentData = async (req, res, next) => {
  if (req.body.doctorId && req.body.subject && !isNaN(req.body.time)) {
    const doctor = await findDoctorById(req.body.doctorId);
    if (req.body.time >= doctor.startTime && req.body.time <= doctor.endTime) {
      return next();
    }
    return renderPageWithMessage(
      req,
      res,
      403,
      filename.patient.appointmentRequest,
      'Select appropriate time'
    );
  }
  return renderPageWithMessage(
    req,
    res,
    403,
    filename.patient.appointmentRequest,
    'Request credentials are not correct'
  );
};

/**
 * Check appointment of doctor for given time
 * @param {httpRequest} req
 * @param {httpResopnse} res
 * @param {Function} next
 */
export const checkDoctorAvailability = async (req, res, next) => {
  const time = Number(req.body.time) % 100;
  const doctor = await findDoctorById(req.body.doctorId);

  if (doctor) {
    const appointment = await findAppointmentByTime(req.body.doctorId, moment().format('l'), time);

    if (appointment) {
      return renderPageWithMessage(
        req,
        res,
        400,
        filename.patient.appointmentRequest,
        'Doctor already has fixed appointment at given time. Please select another timing'
      );
    }
    return next();
  }
  return renderPageWithMessage(
    req,
    res,
    400,
    filename.patient.appointmentRequest,
    'Please select valid doctor'
  );
};

/**
 * Change status of Appointment to completed
 * @param {httpRequest} req
 * @param {httpResopnse} res
 * @param {Function} next
 */
export const appointmentCompleted = async (req, res, next) => {
  const result = await changeAppointmentStatus(req.body.appointmentId, 'confirmed', 'completed');

  if (result) {
    return next();
  }
  return renderPageWithMessage(
    req,
    res,
    403,
    filename.doctor.appointment,
    'Request is not processed. Please enter correct credentials and try again'
  );
};
