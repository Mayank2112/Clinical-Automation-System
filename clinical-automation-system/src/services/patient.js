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
  .catch(err => {
    console.error(err);
    return false;
  });
