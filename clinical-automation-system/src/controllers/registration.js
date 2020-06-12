import { templatePaths } from 'config';
import DoctorService from '../services/doctor';
import PatientService from '../services/patient';
import SupplierService from '../services/supplier';
import renderPageWithMessage from '../helpers/responseRenderer';

export default class Register {
  /**
   * Register new doctor to database
   * @param {httpRequest} req
   * @param {httResponse} res
  */
  static async doctor(req, res) {
    const doctor = req.body;
    doctor.dateOfBirth = new Date(req.body.dateOfBirth).getTime();
    const result = await DoctorService.createDoctor(doctor);

    if (result) {
      return renderPageWithMessage(
        req,
        res,
        201,
        templatePaths.user.homepage,
        `${doctor.username} registered successfully. Login to continue`
      );
    }
    return renderPageWithMessage(
      req,
      res,
      400,
      templatePaths.user.register,
      'Username or email is already in use'
    );
  }

  /**
   * Register new user to database
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  static async patient(req, res) {
    const patient = req.body;
    patient.dateOfBirth = new Date(req.body.dateOfBirth).getTime();
    const result = await PatientService.createPatient(patient);

    if (result) {
      return renderPageWithMessage(
        req,
        res,
        201,
        templatePaths.user.homepage,
        `${patient.username} registered successfully. Login to continue`
      );
    }
    return renderPageWithMessage(
      req,
      res,
      400,
      templatePaths.user.register,
      'Username or email is already in use'
    );
  }

  /**
   * Register new user to database
   * @param {httpRequest} req
   * @param {httResponse} res
   */
  static async supplier(req, res) {
    const supplier = req.body;
    const result = await SupplierService.createSupplier(supplier);

    if (result) {
      return renderPageWithMessage(
        req,
        res,
        201,
        templatePaths.user.homepage,
        `${supplier.username} registered successfully. Login to continue`
      );
    }
    return renderPageWithMessage(
      req,
      res,
      400,
      templatePaths.user.register,
      'Username or email is already in use'
    );
  }
}
