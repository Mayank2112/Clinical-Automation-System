import db from '../models';

const Admin = db.Admin;
const sequelize = db.sequelize;

/**
 * Find admin with given emailId in database
 * @param {String} emailId
 */
export const findAdmin = emailId => sequelize.authenticate()
.then(() => Admin.sync({ force: false })
  .then(() => Admin.findAll({
    where: {
      emailId: emailId
    }
  })
    .then(admin => admin[0].dataValues)
    .catch(() => undefined)))
.catch(console.error);

/**
 * Checks admin with given emailId and password is valid or not
 * @param {String} emailId
 * @param {String} password
 */
export const isValidAdmin = (emailId, password) => findAdmin(emailId)
  .then(admin => {
    if (admin) {
      return password === admin.password;
    }
    return false;
  });
