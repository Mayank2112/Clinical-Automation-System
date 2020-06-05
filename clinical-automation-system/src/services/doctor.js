import { hashSync, compareSync } from 'bcryptjs';
import { v4 } from 'uuid';
import db from '../models';

const Doctor = db.Doctor;
const sequelize = db.sequelize;

/**
 * create new user in database
 * @param {Object} doctor - containing username, email and password
 */
export const createDoctor = doctor => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.create({
      id: v4(),
      name: doctor.username,
      dateOfBirth: doctor.dateOfBirth,
      gender: doctor.gender,
      status: 'registered',
      address: doctor.address,
      mobileNumber: doctor.mobileNumber,
      email: doctor.email,
      password: hashSync(doctor.password, 10)
    })))
  .catch(() => false);

/**
 * Find doctor with given emailId in database
 * @param {String} email
 */
export const findDoctor = email => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.findAll({
      where: {
        email: email
      }
    })
      .then(doctor => doctor[0].dataValues)
      .catch(() => undefined)))
  .catch(console.error);

/**
 * Checks doctor with given emailId and password is valid or not
 * @param {String} email
 * @param {String} password
 */
export const isValidDoctor = (email, password) => findDoctor(email)
  .then(doctor => {
    if (doctor) {
      return compareSync(password, doctor.password);
    }
    return false;
  });

export const addDetails = doctor => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.update({
      startTime: doctor.startTime,
      endTime: doctor.endTime,
      experienceFrom: doctor.experienceFrom,
      degree: doctor.degree,
      appointmentFee: doctor.appointmentFee,
      status: 'pending'
    },
    {
      where: {
        email: doctor.email
      }
    })
    .catch(() => undefined)))
  .catch(console.error);

/**
 * Find doctor with given status
 * @param {String} email
 */
export const findDoctorByStatus = status => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.findAll({
      where: {
        status: status
      }
    })
      .then(doctors => {
        const result = [];
        doctors.forEach(doctor => {
          doctor.dataValues.id = 'Hidden';
          doctor.dataValues.password = 'Hidden';
          result.push(doctor.dataValues);
        });
        return result;
      })
      .catch(() => undefined)))
  .catch(console.error);

export const approveDoctor = email => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.update({
      status: 'approved'
    },
    {
      where: {
        email: email
      }
    })
    .catch(() => undefined)))
  .catch(console.error);

export const deleteDoctor = email => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.destroy(
      {
        where: {
          email: email
        }
      })
      .catch(() => undefined)))
  .catch(console.error);
