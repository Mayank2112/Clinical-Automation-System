import { hashSync, compareSync } from 'bcryptjs';
import { v4 } from 'uuid';
import db from '../models';

const Supplier = db.Supplier;
const PatientOrder = db.PatientOrder;
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
  .catch(err => {
    console.error(err);
    return false;
  });

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
      .then(supplier => supplier[0].dataValues)))
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
/**
 * Add additional details of supplier to database
 * @param {Object} supplier
 */
export const addDetails = supplier => sequelize.authenticate()
  .then(() => Supplier.sync({ force: false })
    .then(() => Supplier.update({
      companyName: supplier.companyName,
      companyAddress: supplier.companyAddress,
      status: 'pending'
    },
      {
        where: {
          email: supplier.email
        }
      })))
  .catch(console.error);

/**
 * Find supplier with given status
 * @param {String} email
 */
export const findSupplierByStatus = status => sequelize.authenticate()
  .then(() => Supplier.sync({ force: false })
    .then(() => Supplier.findAll({
      where: {
        status: status
      }
    })
      .then(suppliers => {
        const result = [];
        suppliers.forEach(supplier => {
          supplier.dataValues.password = 'Hidden';
          result.push(supplier.dataValues);
        });
        return result;
      })))
  .catch(console.error);

/**
 * Change status from pending to approved for doctor
 * @param {String} email
 */
export const approveSupplier = email => sequelize.authenticate()
  .then(() => Supplier.sync({ force: false })
    .then(() => Supplier.update({
      status: 'approved'
    },
      {
        where: {
          email: email
        }
      })))
  .catch(console.error);

/**
 * Delete supplier from database
 * @param {String} email
 */
export const deleteSupplier = email => sequelize.authenticate()
  .then(() => Supplier.sync({ force: false })
    .then(() => Supplier.destroy(
      {
        where: {
          email: email
        }
      })))
  .catch(console.error);

/**
 * Get list of suppliers
 */
export const getSupplierList = () => sequelize.authenticate()
  .then(() => Supplier.sync({ force: false })
    .then(() => Supplier.findAll({
      where: {
        status: 'approved'
      }
    })
      .then(suppliers => {
        const result = [];
        suppliers.forEach(supplier => {
          supplier.dataValues.password = 'Hidden';
          result.push(supplier.dataValues);
        });
        return result;
      })))
  .catch(console.error);

/**
 * Find orders from database of supplier
 * @param {Object} medicine
 */
export const findOrdersBySupplier = supplierId => sequelize.authenticate()
  .then(() => PatientOrder.sync({ force: false })
    .then(() => PatientOrder.findAll({
      where: {
        supplierId: supplierId,
        status: 'confirmed'
      }
    })
      .then(orders => {
        const result = [];
        orders.forEach(order => {
          result.push(order.dataValues);
        });
        return result;
      })))
  .catch(err => {
    console.error(err);
    return false;
  });

/**
 * Change order status to given status
 * @param {Object} orderId
 * @param {String} status
 */
export const changeOrderStatus = (orderId, status) => sequelize.authenticate()
  .then(() => PatientOrder.sync({ force: false })
    .then(() => PatientOrder.update({
      status: status
    },
      {
        where: {
          id: orderId
        }
      })))
  .catch(console.error);
