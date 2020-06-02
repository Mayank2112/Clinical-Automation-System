import db from '../models';

const Patient = db.Patient;
const sequelize = db.sequelize;

/**
 * create new user in database
 * @param {Object} patient - containing username, email and password
 */
export const createPatient = patient => sequelize.authenticate()
  .then(() => Patient.sync({ force: false })
    .then(() => Patient.create({
      patientName: patient.username,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      address: patient.address,
      mobileNumber: patient.mobileNumber,
      emailId: patient.email,
      password: patient.password
    })))
  .catch(() => false);

/**
 * Find patient with given emailId in database
 * @param {String} emailId
 */
export const findPatient = emailId => sequelize.authenticate()
  .then(() => Patient.sync({ force: false })
    .then(() => Patient.findAll({
      where: {
        emailId: emailId
      }
    })
      .then(patient => patient[0].dataValues)
      .catch(() => undefined)))
  .catch(console.error);

/**
 * Checks patient with given emailId and password is valid or not
 * @param {String} emailId
 * @param {String} password
 */
export const isValidPatient = (emailId, password) => findPatient(emailId)
  .then(patient => {
    if (patient) {
      return password === patient.password;
    }
    return false;
  });
