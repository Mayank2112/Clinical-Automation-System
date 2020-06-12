import { compareSync } from 'bcryptjs';
import { v4 } from 'uuid';
import db from '../models';

const { Admin, Medicine } = db;

export default class AdminService {
  /**
   * Find admin with given emailId in database
   * @param {String} email
   */
  static find(email) {
    return Admin.findAll({
      where: { email }
    })
      .then(admin => admin[0].dataValues)
      .catch(console.error);
  }

  /**
   * Checks admin with given emailId and password is valid or not
   * @param {String} email
   * @param {String} password
   */
  static isValidAdmin(email, password) {
    return this.find(email)
      .then(admin => {
        if (admin) {
          return compareSync(password, admin.password);
        }
        return false;
      });
  }

  /**
   * Add new medicine to database
   * @param {Object} medicine
   */
  static addNewMedicine(medicine) {
    medicine.id = v4();
    return Medicine.create(medicine)
      .catch(err => {
        console.error(err);
        return false;
      });
  }
}
