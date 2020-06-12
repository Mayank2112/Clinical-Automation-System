import { hashSync, compareSync } from 'bcryptjs';
import { v4 } from 'uuid';
import db from '../models';

const { Patient, PatientHistory, Medicine, PatientOrder } = db;

export default class PatientService {
  /**
   * create new user in database
   * @param {Object} patient - containing username, email and password
   */
  static createPatient(patient) {
    return Patient.create({
      id: v4(),
      name: patient.username,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      address: patient.address,
      mobileNumber: patient.mobileNumber,
      email: patient.email,
      password: hashSync(patient.password, 10)
    })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  /**
   * Find patient with given emailId in database
   * @param {String} email
   */
  static findPatient(email) {
    return Patient.findAll(
      {
        where: { email }
      })
      .then(patient => patient[0].dataValues)
      .catch(console.error);
  }

  /**
   * Checks patient with given emailId and password is valid or not
   * @param {String} email
   * @param {String} password
   */
  static isValidPatient(email, password) {
    return this.findPatient(email)
      .then(patient => {
        if (patient) {
          return compareSync(password, patient.password);
        }
        return false;
      });
  }

  /**
   * Find patient with given id in database
   * @param {UUID} id
   */
  static findPatientById(id) {
    return Patient.findAll(
      {
        where: { id }
      })
      .then(patient => patient[0].dataValues)
      .catch(console.error);
  }

  /**
   * Save patient report to patientHistory table
   * @param {Object} report
   */
  static savePatientReport(report) {
    report.id = v4();
    return PatientHistory.create(report)
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  /**
   * Find medicine from database
   * @param {Object} medicine
   */
  static findMedicine(name) {
    return Medicine.findAll(
      {
        where: {
          name
        }
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  /**
   * Add new order to database
   * @param {Object} order
   */
  static addOrder(order) {
    order.id = v4();
    return PatientOrder.create(order)
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  /**
   * Find orders from database of patient
   * @param {Object} medicine
   */
  static findOrders(patientId) {
    return PatientOrder.findAll(
      {
        where: { patientId }
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }
}
