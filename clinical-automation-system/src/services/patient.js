import { hashSync, compareSync } from 'bcryptjs';
import { v4 } from 'uuid';
import db from '../models';

const Patient = db.Patient;
const PatientHistory = db.PatientHistory;
const Medicine = db.Medicine;
const PatientOrder = db.PatientOrder;
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
      password: hashSync(patient.password, 10)
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
      return compareSync(password, patient.password);
    }
    return false;
  });

/**
 * Find patient with given id in database
 * @param {UUID} id
 */
export const findPatientById = id => sequelize.authenticate()
  .then(() => Patient.sync({ force: false })
    .then(() => Patient.findAll({
      where: {
        id: id
      }
    })
      .then(patient => patient[0].dataValues)
      .catch(() => undefined)))
  .catch(console.error);

/**
 * Save patient report to patientHistory table
 * @param {Object} report
 */
export const savePatientReport = report => sequelize.authenticate()
  .then(() => PatientHistory.sync({ force: false })
    .then(() => PatientHistory.create({
      id: v4(),
      appointmentId: report.appointmentId,
      disease: report.disease,
      remark: report.remark,
      patientReport: report.patientReport
    })))
  .catch(() => false);

/**
 * Find medicine from database
 * @param {Object} medicine
 */
export const findMedicine = (name, quantity) => sequelize.authenticate()
  .then(() => Medicine.sync({ force: false })
    .then(() => Medicine.findAll({
      where: {
        name: name
      }
    })))
  .catch(err => {
    console.error(err);
    return false
  });

/**
 * Add new order to database
 * @param {Object} order
 */
export const addOrder = order => sequelize.authenticate()
  .then(() => PatientOrder.sync({ force: true })
    .then(() => PatientOrder.create({
      id: v4(),
      medicineId: order.medicineId || null,
      supplierId: order.supplierId || null,
      patientId: order.patientId,
      quantity: order.quantity,
      amount: order.amount || null,
      date: order.date,
      medicineName: order.medicineName,
      status: order.status
    })))
  .catch(err => {
    console.error(err);
    return false;
  });

/**
 * Find orders from database of patient
 * @param {Object} medicine
 */
export const findOrders = patientId => sequelize.authenticate()
  .then(() => PatientOrder.sync({ force: false })
    .then(() => PatientOrder.findAll({
      where: {
        patientId: patientId
      }
    })))
  .catch(err => {
    console.error(err);
    return false;
  });
