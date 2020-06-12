import { v4 } from 'uuid';
import db from '../models';

const { DoctorAppointment, PatientHistory } = db;

export default class AppointmentService {
  /**
   * create new appointment in database
   * @param {Object} appointment
   */
  static createAppointment(appointment) {
    appointment.id = v4();
    appointment.status = appointment.status || null;
    return DoctorAppointment.create(appointment)
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  /**
   * Find appointment of doctor with time
   * @param {UUID} doctorId
   * @param {Date} date
   * @param {Number} time
   */
  static findAppointmentByTime(doctorId, date, time) {
    return DoctorAppointment.findAll(
      {
        where: {
          doctorId,
          date,
          time,
          status: 'confirmed'
        }
      })
      .then(appointment => appointment[0].dataValues)
      .catch(console.error);
  }

  /**
   * Find appointment with given patientId in database
   * @param {UUID} patientId
   */
  static findAppointmentByPatient(patientId) {
    return DoctorAppointment.findAll(
      {
        where: { patientId }
      })
      .then(appointments => {
        const result = [];
        appointments.forEach(appointment => {
          result.push(appointment.dataValues);
        });
        return result;
      })
      .catch(console.error);
  }

  /**
   * Find appointment with given doctorId and status in database
   * @param {UUID} doctorId
   * @param {String} status
   */
  static findAppointmentByDoctor(doctorId, status) {
    return DoctorAppointment.findAll(
      {
        where: {
          doctorId,
          status
        }
      })
      .then(appointments => {
        const result = [];
        appointments.forEach(appointment => {
          result.push(appointment.dataValues);
        });
        return result;
      })
      .catch(console.error);
  }

  /**
   * Change appointment status in database
   * @param {UUID} id
   * @param {String} statusFrom
   * @param {String} statusTo
   */
  static changeAppointmentStatus(id, statusFrom, statusTo) {
    return DoctorAppointment.update(
      {
        status: statusTo
      },
      {
        where: {
          id,
          status: statusFrom
        }
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  /**
   * Delete appointment from database
   * @param {UUID} id
   */
  static deleteAppointment(id) {
    return DoctorAppointment.destroy(
      {
        where: { id }
      })
      .catch(console.error);
  }

  /**
   * Find appointment with patient history
   * @param {UUID} patientId
   */
  static findAppointmentWithHistory(patientId) {
    return DoctorAppointment.findAll(
      {
        where: {
          patientId,
          status: 'completed'
        },
        include: [{
          model: PatientHistory
        }]
      })
      .then(appointments => {
        const result = [];
        appointments.forEach(appointment => {
          result.push(appointment.dataValues);
        });
        return result;
      })
      .catch(console.error);
  }
}
