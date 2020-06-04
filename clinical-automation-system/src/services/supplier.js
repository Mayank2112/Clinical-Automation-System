import { hashSync, compareSync } from 'bcryptjs';
import { v4 } from 'uuid';
import db from '../models';

const Supplier = db.Supplier;
const sequelize = db.sequelize;

/**
 * create new user in database
 * @param {Object} supplier - containing username, email and password
 */
export const createSupplier = supplier => sequelize.authenticate()
  .then(() => Supplier.sync({ force: false })
    .then(() => Supplier.create({
      id: v4(),
      name: supplier.username,
      mobileNumber: supplier.mobileNumber,
      email: supplier.email,
      password: hashSync(supplier.password, 10),
      status: 'registered'
    })))
  .catch(err => false);

/**
 * Find supplier with given emailId in database
 * @param {String} email
 */
export const findSupplier = email => sequelize.authenticate()
  .then(() => Supplier.sync({ force: false })
    .then(() => Supplier.findAll({
      where: {
        email: email
      }
    })
      .then(supplier => supplier[0].dataValues)
      .catch(() => undefined)))
  .catch(console.error);

/**
 * Checks supplier with given emailId and password is valid or not
 * @param {String} email
 * @param {String} password
 */
export const isValidSupplier = (email, password) => findSupplier(email)
  .then(supplier => {
    if (supplier) {
      return compareSync(password, supplier.password);
    }
    return false;
  });
