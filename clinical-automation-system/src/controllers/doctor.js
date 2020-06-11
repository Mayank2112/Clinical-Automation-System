import { filename } from 'config';
import { createDoctor } from '../services/doctor';
import renderPageWithMessage from '../helpers/responseRenderer';

/**
 * Register new doctor to database
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const registerDoctor = async (req, res) => {
  const doctor = req.body;
  doctor.dateOfBirth = new Date(req.body.dateOfBirth).getTime();

  const result = await createDoctor(doctor);
  if (result) {
    return renderPageWithMessage(
      req,
      res,
      201,
      filename.user.homepage,
      `${doctor.username} registered successfully. Login to continue`
    );
  }
  return renderPageWithMessage(
    req,
    res,
    400,
    filename.user.register,
    'Username or email is already in use'
  );
};

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => {
  const details = {
    name: req.user.username,
    status: req.user.status
  };
  return renderPageWithMessage(req, res, 200, filename.doctor.dashboard, null, details);
};
