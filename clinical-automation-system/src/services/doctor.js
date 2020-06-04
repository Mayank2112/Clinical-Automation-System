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
