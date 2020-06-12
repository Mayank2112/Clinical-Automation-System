import { hashSync, compareSync } from 'bcryptjs';
import { v4 } from 'uuid';
import db from '../models';

const { Doctor, Specialization } = db;

export default class DoctorService {
  /**
   * create new user in database
   * @param {Object} doctor - containing username, email and password
   */
  static createDoctor(doctor) {
    return Doctor.create({
      id: v4(),
      name: doctor.username,
      dateOfBirth: doctor.dateOfBirth,
      gender: doctor.gender,
      status: 'registered',
      address: doctor.address,
      mobileNumber: doctor.mobileNumber,
      email: doctor.email,
      password: hashSync(doctor.password, 10)
    })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  /**
   * Find doctor with given emailId in database
   * @param {String} email
   */
  static findDoctor(email) {
    return Doctor.findAll({
      where: {
        email
      },
      include: [{
        model: Specialization
      }]
    })
      .then(doctor => doctor[0].dataValues)
      .catch(console.error);
  }

  /**
   * Checks doctor with given emailId and password is valid or not
   * @param {String} email
   * @param {String} password
   */
  static isValidDoctor(email, password) {
    return this.findDoctor(email)
      .then(doctor => {
        if (doctor) {
          return compareSync(password, doctor.password);
        }
        return false;
      });
  }

  /**
   * Add additional information of doctor to database
   * @param {Object} doctor
   */
  static addDetails(doctor) {
    doctor.status = 'pending';
    return Doctor.update(
      doctor,
      {
        where: {
          email: doctor.email
        }
      })
      .catch(console.error);
  }

  /**
   * Find doctor with given status
   * @param {String} email
   */
  static findDoctorByStatus(status) {
    return Doctor.findAll(
      {
        where: { status },
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
      })
      .catch(console.error);
  }

  /**
   * Change status from pending to approved for doctor
   * @param {String} email
   */
  static approveDoctor(email) {
    return Doctor.update(
      {
        status: 'approved'
      },
      {
        where: { email }
      })
      .catch(console.error);
  }

  /**
   * Delete doctor from database
   * @param {String} email
   */
  static deleteDoctor(email) {
    return Doctor.destroy(
      {
        where: { email }
      })
      .catch(console.error);
  }

  /**
   * Find doctor with given id in database
   * @param {UUID} id
   */
  static findDoctorById(id) {
    return Doctor.findAll(
      {
        where: { id },
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
      })
      .catch(console.error);
  }

  /**
   * Add doctor's specialization
   * @param {UUID} doctorId
   * @param {STrin} specialization
   */
  static addDoctorSpecialization(doctorId, specialization) {
    return Specialization.create(
      {
        id: v4(),
        doctorId,
        name: specialization
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }
}
