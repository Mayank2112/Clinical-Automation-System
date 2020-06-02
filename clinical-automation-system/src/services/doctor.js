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
  .catch(err => {
    console.error(err);
    return false;
  });
