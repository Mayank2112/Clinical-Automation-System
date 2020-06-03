import db from '../models';
import { v4 } from 'uuid';

const Patient = db.Patient;
const sequelize = db.sequelize;

/**
 * create new user in database
 * @param {Object} patient - containing username, email and password
 */
export const createPatient = patient => sequelize.authenticate()
  .then(() => Patient.sync({ force: false })
    .then(() => Patient.create({
      id: v4(),
      name: patient.username,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      address: patient.address,
      mobileNumber: patient.mobileNumber,
      email: patient.email,
      password: patient.password
    })))
  .catch(() => false);

/**
 * Find patient with given emailId in database
 * @param {String} email
 */
export const findPatient = email => sequelize.authenticate()
  .then(() => Patient.sync({ force: false })
    .then(() => Patient.findAll({
      where: {
        email: email
      }
    })
      .then(patient => patient[0].dataValues)
      .catch(() => undefined)))
  .catch(console.error);

/**
 * Checks patient with given emailId and password is valid or not
 * @param {String} email
 * @param {String} password
 */
export const isValidPatient = (email, password) => findPatient(email)
  .then(patient => {
    if (patient) {
      return password === patient.password;
    }
    return false;
  });
