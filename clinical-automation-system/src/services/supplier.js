import db from '../models';

const Supplier = db.Supplier;
const sequelize = db.sequelize;

/**
 * create new user in database
 * @param {Object} supplier - containing username, email and password
 */
export const createSupplier = supplier => sequelize.authenticate()
  .then(() => Supplier.sync({ force: true })
    .then(() => Supplier.create({
      supplierName: supplier.username,
      companyName: 'pending',
      companyAddress: 'pending',
      mobileNumber: supplier.mobileNumber,
      emailId: supplier.email,
      password: supplier.password,
      status: 'pending'
    })))
  .catch(err => false);

/**
 * Find supplier with given emailId in database
 * @param {String} emailId
 */
export const findSupplier = emailId => sequelize.authenticate()
  .then(() => Supplier.sync({ force: false })
    .then(() => Supplier.findAll({
      where: {
        emailId: emailId
      }
    })
      .then(supplier => supplier[0].dataValues)
      .catch(() => undefined)))
  .catch(console.error);

/**
 * Checks supplier with given emailId and password is valid or not
 * @param {String} emailId
 * @param {String} password
 */
export const isValidSupplier = (emailId, password) => findSupplier(emailId)
  .then(supplier => {
    if (supplier) {
      return password === supplier.password;
    }
    return false;
  });
