import { templatePaths } from 'config';
import { findMedicine } from '../services/patient';
import { getSupplierList } from '../services/supplier';
import renderPageWithMessage from '../helpers/responseRenderer';

/**
 * Checks medicine availability at store
 * @param {httpRequest} req
 * @param {httpResponse} res
 * @param {callback function} next
 */
const checkMedicineAvailabilty = async (req, res, next) => {
  const medicine = await findMedicine(req.body.medicineName, req.body.quantity);

  if (medicine.length || req.body.supplierId) {
    return next();
  }
  const suppliers = await getSupplierList();
  return renderPageWithMessage(
    req,
    res,
    200,
    templatePaths.patient.makeOrder,
    'Not available at store',
    {
      medicine: req.body,
      suppliers
    }
  );
};

export default checkMedicineAvailabilty;
