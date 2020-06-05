import { v4 } from 'uuid';
import db from '../models';

const DoctorAppointment = db.DoctorAppointment;
const sequelize = db.sequelize;

/**
 * create new user in database
 * @param {Object} appointment - containing username, email and password
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
  .catch(() => false);

/**
 * Find doctor with given emailId in database
 * @param {String} email
 */
export const findAppointmentByTime = (doctorId, date, time) => sequelize.authenticate()
  .then(() => DoctorAppointment.sync({ force: false })
    .then(() => DoctorAppointment.findAll({
      where: {
        doctorId: doctorId,
        date: date,
        time: time,
        status: 'approved'
      }
    })
      .then(appointment => appointment[0].dataValues)
      .catch(err => undefined)))
  .catch(console.error);

/**
 * Find doctor with given patientId in database
 * @param {String} id
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
          appointment.dataValues.id = 'Hidden';
          result.push(appointment.dataValues);
        });
        return result;
      })
      .catch(err => undefined)))
  .catch(console.error);

/**
 * Find doctor with given doctorId in database
 * @param {String} id
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
          appointment.dataValues.id = 'Hidden';
          result.push(appointment.dataValues);
        });
        return result;
      })
      .catch(err => undefined)))
  .catch(console.error);

export const approveAppointment = (patientId, doctorId, date) => sequelize.authenticate()
  .then(() => DoctorAppointment.sync({ force: false })
    .then(() => DoctorAppointment.update({
      status: 'confirmed'
    },
      {
        where: {
          patientId: patientId,
          doctorId: doctorId,
          date: date,
          status: 'pending'
        }
      })
      .catch(err => undefined)))
  .catch(console.error);

export const deleteAppointment = (patientId, doctorId, date) => sequelize.authenticate()
  .then(() => DoctorAppointment.sync({ force: false })
    .then(() => DoctorAppointment.destroy({
      where: {
        patientId: patientId,
        doctorId: doctorId,
        date: date
      }
    })
      .catch(() => undefined)))
  .catch(console.error);
