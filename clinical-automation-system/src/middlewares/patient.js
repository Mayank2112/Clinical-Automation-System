import { filename } from 'config';
import { findMedicine } from '../services/patient';
import { getSupplierList } from '../services/supplier';
import renderPageWithMessage from '../helpers/responseRenderer';

/**
 * Checks patient is logged in or not
 * @param {httpRequest} req
 * @param {httpResponse} res
 * @param {callback function} next
 */
export const isPatientLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.session.passport.user.type === 'patient') {
    return next();
  }
  res.status(401);
  return res.redirect('/login');
};

/**
 * Checks medicine availability at store
 * @param {httpRequest} req
 * @param {httpResponse} res
 * @param {callback function} next
 */
export const checkMedicineAvailabilty = async (req, res, next) => {
  const medicine = await findMedicine(req.body.medicineName, req.body.quantity);

  if (medicine.length || req.body.supplierId) {
    return next();
  }
  const suppliers = await getSupplierList();
  return renderPageWithMessage(res,
    200,
    filename.patient.makeOrder,
    'Not available at store',
    {
      medicine: req.body,
      suppliers
    });
};
