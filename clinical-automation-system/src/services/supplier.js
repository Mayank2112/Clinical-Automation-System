import { hashSync, compareSync } from 'bcryptjs';
import { v4 } from 'uuid';
import db from '../models';

const { Supplier, PatientOrder } = db;

export default class SupplierService {
  /**
   * create new user in database
   * @param {Object} supplier - containing username, email and password
   */
  static createSupplier(supplier) {
    return Supplier.create(
      {
        id: v4(),
        name: supplier.username,
        mobileNumber: supplier.mobileNumber,
        email: supplier.email,
        password: hashSync(supplier.password, 10),
        status: 'registered'
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }
  /**
   * Find supplier with given emailId in database
   * @param {String} email
   */

  static findSupplier(email) {
    return Supplier.findAll(
      {
        where: { email }
      })
      .then(supplier => supplier[0].dataValues)
      .catch(console.error);
  }

  /**
   * Checks supplier with given emailId and password is valid or not
   * @param {String} email
   * @param {String} password
   */
  static isValidSupplier(email, password) {
    return this.findSupplier(email)
      .then(supplier => {
        if (supplier) {
          return compareSync(password, supplier.password);
        }
        return false;
      });
  }

  /**
   * Add additional details of supplier to database
   * @param {Object} supplier
   */
  static addDetails(supplier) {
    supplier.status = 'pending';
    return Supplier.update(
      supplier,
      {
        where: {
          email: supplier.email
        }
      })
      .catch(console.error);
  }

  /**
   * Find supplier with given status
   * @param {String} email
   */
  static findSupplierByStatus(status) {
    return Supplier.findAll(
      {
        where: { status }
      })
      .then(suppliers => {
        const result = [];
        suppliers.forEach(supplier => {
          supplier.dataValues.password = 'Hidden';
          result.push(supplier.dataValues);
        });
        return result;
      })
      .catch(console.error);
  }

  /**
   * Change status from pending to approved for doctor
   * @param {String} email
   */
  static approveSupplier(email) {
    return Supplier.update(
      {
        status: 'approved'
      },
      {
        where: { email }
      })
      .catch(console.error);
  }

  /**
   * Delete supplier from database
   * @param {String} email
   */
  static deleteSupplier(email) {
    return Supplier.destroy(
      {
        where: { email }
      })
      .catch(console.error);
  }

  /**
   * Get list of suppliers
   */
  static getSupplierList() {
    return Supplier.findAll(
      {
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
      })
      .catch(console.error);
  }

  /**
   * Find orders from database of supplier
   * @param {Object} medicine
   */
  static findOrdersBySupplier(supplierId) {
    return PatientOrder.findAll(
      {
        where: {
          supplierId,
          status: 'confirmed'
        }
      })
      .then(orders => {
        const result = [];
        orders.forEach(order => {
          result.push(order.dataValues);
        });
        return result;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  /**
   * Change order status to given status
   * @param {Object} orderId
   * @param {String} status
   */
  static changeOrderStatus(orderId, status) {
    return PatientOrder.update({ status },
      {
        where: {
          id: orderId
        }
      })
      .catch(console.error);
  }
}
