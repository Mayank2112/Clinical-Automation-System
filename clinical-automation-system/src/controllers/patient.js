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

  const result = await createPatient(patient);
  if (result) {
    return renderPageWithMessage(res, 201, filename.user.homepage, `${patient.username} registered successfully. Login to continue`);
  }
  return renderPageWithMessage(res, 400, filename.user.register, 'Username or email is already in use');
};

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => {
  res.render(filename.patient.dashboard, { username: req.user.username });
};
