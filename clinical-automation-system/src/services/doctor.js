import { hashSync, compareSync } from 'bcryptjs';
import { v4 } from 'uuid';
import db from '../models';

const { Doctor, Specialization, sequelize } = db;

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
  .catch(err => {
    console.error(err);
    return false;
  });

/**
 * Find doctor with given emailId in database
 * @param {String} email
 */
export const findDoctor = email => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.findAll({
      where: {
        email: email
      },
      include: [{
        model: Specialization
      }]
    })
      .then(doctor => doctor[0].dataValues)))
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
/**
 * Add additional information of doctor to database
 * @param {Object} doctor
 */
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
      })))
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
      },
      include: [{
        model: Specialization
      }]
    })
      .then(doctors => {
        const result = [];
        doctors.forEach(doctor => {
          doctor.dataValues.password = 'Hidden';
          doctor.dataValues.specialization = doctor.Specializations[0].dataValues;
          result.push(doctor.dataValues);
        });
        return result;
      })))
  .catch(console.error);

/**
 * Change status from pending to approved for doctor
 * @param {String} email
 */
export const approveDoctor = email => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.update({
      status: 'approved'
    },
      {
        where: {
          email: email
        }
      })))
  .catch(console.error);

/**
 * Delete doctor from database
 * @param {String} email
 */
export const deleteDoctor = email => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.destroy(
      {
        where: {
          email: email
        }
      })))
  .catch(console.error);

/**
 * Find doctor with given id in database
 * @param {UUID} id
 */
export const findDoctorById = id => sequelize.authenticate()
  .then(() => Doctor.sync({ force: false })
    .then(() => Doctor.findAll({
      where: {
        id: id
      },
      include: [{
        model: Specialization
      }]
    })
      .then(doctor => {
        doctor[0].dataValues.password = 'Hidden';
        if (doctor[0].Specializations.length) {
          doctor[0].dataValues.specialization = doctor[0].Specializations[0].dataValues;
        }
        return doctor[0].dataValues;
      })))
  .catch(console.error);

/**
 * Add doctor's specialization
 * @param {*} doctorId
 * @param {*} specialization
 */
export const addDoctorSpecialization = (doctorId, specialization) => sequelize.authenticate()
  .then(() => Specialization.sync({ force: false })
    .then(() => Specialization.create({
      id: v4(),
      doctorId: doctorId,
      name: specialization
    })))
  .catch(err => {
    console.error(err);
    return false;
  });
