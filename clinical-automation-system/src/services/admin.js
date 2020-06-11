import { compareSync } from 'bcryptjs';
import db from '../models';

const Admin = db.Admin;
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
      .then(admin => admin[0].dataValues)))
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
