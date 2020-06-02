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
  .catch(err => {
    console.error(err);
    return false;
  });
