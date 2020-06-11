import { filename } from 'config';
import { createPatient } from '../services/patient';
import renderPageWithMessage from '../helpers/responseRenderer';

/**
 * Register new user to database
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const registerPatient = async (req, res) => {
  const patient = req.body;
  patient.dateOfBirth = new Date(req.body.dateOfBirth).getTime();

  try {
    const result = await createPatient(patient);
    if (result) {
      return renderPageWithMessage(
        req,
        res,
        201,
        filename.user.homepage,
        `${patient.username} registered successfully. Login to continue`
      );
    }
  } catch (error) {
    return renderPageWithMessage(
      req,
      res,
      400,
      filename.user.register,
      error.message
    );
  }
};

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => renderPageWithMessage(
  req,
  res,
  200,
  filename.patient.dashboard
);
