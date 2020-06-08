import { compareSync } from 'bcryptjs';
import { v4 } from 'uuid';
import db from '../models';

const Admin = db.Admin;
const Medicine = db.Medicine;
const sequelize = db.sequelize;

/**
 * Find admin with given emailId in database
 * @param {String} email
 */
export const findAdmin = email => sequelize.authenticate()
  .then(() => Admin.sync({ force: false })
    .then(() => Admin.findAll({
      where: {
        email: email
      }
    })
      .then(admin => admin[0].dataValues)
      .catch(() => undefined)))
  .catch(console.error);

/**
 * Checks admin with given emailId and password is valid or not
 * @param {String} email
 * @param {String} password
 */
export const isValidAdmin = (email, password) => findAdmin(email)
  .then(admin => {
    if (admin) {
      return compareSync(password, admin.password);
    }
    return false;
  });

/**
 * Add new medicine to database
 * @param {Object} medicine
 */
export const addNewMedicine = medicine => sequelize.authenticate()
  .then(() => Medicine.sync({ force: false })
    .then(() => Medicine.create({
      id: v4(),
      name: medicine.name,
      manufacturingDate: medicine.manufacturingDate,
      expiryDate: medicine.expiryDate,
      pricePerTablet: medicine.pricePerTablet,
      quantity: medicine.quantity
    })))
  .catch(err => {
    console.error(err);
    return false;
  });
