import { v4 } from 'uuid';
import db from '../models';

const { DoctorAppointment, PatientHistory, sequelize } = db;

/**
 * create new appointment in database
 * @param {Object} appointment
 */
export const createAppointment = appointment => sequelize.authenticate()
  .then(() => DoctorAppointment.sync({ force: false })
    .then(() => DoctorAppointment.create({
      id: v4(),
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      subject: appointment.subject,
      status: appointment.status || 'pending',
      description: appointment.description,
      date: appointment.date,
      time: appointment.time,
    })))
  .catch(err => {
    console.error(err);
    return false;
  });

/**
 * Find appointment of doctor with time
 * @param {UUID} doctorId
 * @param {Date} date
 * @param {Number} time
 */
export const findAppointmentByTime = (doctorId, date, time) => sequelize.authenticate()
  .then(() => DoctorAppointment.sync({ force: false })
    .then(() => DoctorAppointment.findAll({
      where: {
        doctorId: doctorId,
        date: date,
        time: time,
        status: 'confirmed'
      }
    })
      .then(appointment => appointment[0].dataValues)))
  .catch(console.error);

/**
 * Find appointment with given patientId in database
 * @param {UUID} id
 */
export const findAppointmentByPatient = id => sequelize.authenticate()
  .then(() => DoctorAppointment.sync({ force: false })
    .then(() => DoctorAppointment.findAll({
      where: {
        patientId: id
      }
    })
      .then(appointments => {
        const result = [];
        appointments.forEach(appointment => {
          result.push(appointment.dataValues);
        });
        return result;
      })))
  .catch(console.error);

/**
 * Find appointment with given doctorId and status in database
 * @param {UUID} id
 * @param {String} status
 */
export const findAppointmentByDoctor = (id, status) => sequelize.authenticate()
  .then(() => DoctorAppointment.sync({ force: false })
    .then(() => DoctorAppointment.findAll({
      where: {
        doctorId: id,
        status: status
      }
    })
      .then(appointments => {
        const result = [];
        appointments.forEach(appointment => {
          result.push(appointment.dataValues);
        });
        return result;
      })))
  .catch(console.error);

/**
 * Change appointment status in database
 * @param {UUID} id
 * @param {String} statusFrom
 * @param {String} statusTo
 */
export const changeAppointmentStatus = (id, statusFrom, statusTo) => sequelize.authenticate()
  .then(() => DoctorAppointment.sync({ force: false })
    .then(() => DoctorAppointment.update({
      status: statusTo
    },
      {
        where: {
          id: id,
          status: statusFrom
        }
      })))
  .catch(err => {
    console.error(err);
    return false;
  });

/**
 * Delete appointment from database
 * @param {UUID} id
 */
export const deleteAppointment = id => sequelize.authenticate()
  .then(() => DoctorAppointment.sync({ force: false })
    .then(() => DoctorAppointment.destroy({
      where: {
        id: id
      }
    })))
  .catch(console.error);

/**
 * Find appointment with patient history
 * @param {UUID} id
 */
export const findAppointmentWithHistory = id => sequelize.authenticate()
  .then(() => DoctorAppointment.sync({ force: false })
    .then(() => DoctorAppointment.findAll({
      where: {
        patientId: id,
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
      })))
  .catch(console.error);
