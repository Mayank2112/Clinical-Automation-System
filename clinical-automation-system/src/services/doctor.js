import db from '../models';

const Doctor = db.Doctor;
const sequelize = db.sequelize;

/**
 * create new user in database
 * @param {Object} patient - containing username, email and password
 */
export const createDoctor = patient => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.create({
      doctorName: patient.username,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      degree: 'pending',
      specialized: 'pending',
      experience: -1,
      appointmentFee: -1,
      status: 'pending',
      address: patient.address,
      mobileNumber: patient.mobileNumber,
      emailId: patient.email,
      password: patient.password
    })))
  .catch(() => false);

/**
 * Find doctor with given emailId in database
 * @param {String} emailId
 */
export const findDoctor = emailId => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.findAll({
      where: {
        emailId: emailId
      }
    })
      .then(doctor => doctor[0].dataValues)
      .catch(() => undefined)))
  .catch(console.error);

/**
 * Checks doctor with given emailId and password is valid or not
 * @param {String} emailId
 * @param {String} password
 */
export const isValidDoctor = (emailId, password) => findDoctor(emailId)
  .then(doctor => {
    if (doctor) {
      return password === doctor.password;
    }
    return false;
  });
