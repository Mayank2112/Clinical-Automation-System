import moment from 'moment';
import { filename } from 'config';
import { isValidEmail } from '../helpers/validator';
import renderPageWithMessage from '../helpers/responseRenderer';
import { findDoctor } from '../services/doctor';
import { findAppointmentByTime, changeAppointmentStatus } from '../services/appointment';

export const checkAppointmentData = (req, res, next) => {
  if (isValidEmail(req.body.doctorEmail) && req.body.subject && !isNaN(req.body.time)) {
    return next();
  }
  return renderPageWithMessage(res, 403, filename.patient.appointmentRequest, 'Request credentials are not correct');
};

export const checkDoctorAvailability = async (req, res, next) => {
  const time = Number(req.body.time) % 100;
  const doctor = await findDoctor(req.body.doctorEmail);

  if (doctor) {
    const appointment = await findAppointmentByTime(doctor.id, moment().format('l'), time);

    if (appointment) {
      return renderPageWithMessage(res, 400, filename.patient.appointmentRequest, 'Doctor already has fixed appointment at given time. Please select another timing');
    }
    return next();
  }
  return renderPageWithMessage(res, 400, filename.patient.appointmentRequest, 'Please select valid doctor');
};

export const appointmentCompleted = async (req, res, next) => {
  const result = await changeAppointmentStatus(req.body.appointmentId, 'confirmed', 'completed');

  if (result) {
    return next();
  }
  return renderPageWithMessage(res, 403, filename.doctor.appointment, 'Request is not processed. Please enter correct credentials and try again');
};
