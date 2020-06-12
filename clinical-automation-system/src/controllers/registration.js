import { templatePaths } from 'config';
import { createDoctor } from "../services/doctor";
import renderPageWithMessage from "../helpers/responseRenderer";
import { createPatient } from "../services/patient";
import { createSupplier } from "../services/supplier";

export default class Register {
  /**
   * Register new doctor to database
   * @param {httpRequest} req
   * @param {httResponse} res
  */
  async doctor(req, res) {
    const doctor = req.body;
    doctor.dateOfBirth = new Date(req.body.dateOfBirth).getTime();
    const result = await createDoctor(doctor);

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
  async patient(req, res) {
    const patient = req.body;
    patient.dateOfBirth = new Date(req.body.dateOfBirth).getTime();
    const result = await createPatient(patient);

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
  async supplier(req, res) {
    const supplier = req.body;
    const result = await createSupplier(supplier);

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
