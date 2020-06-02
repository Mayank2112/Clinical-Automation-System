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
    return renderPageWithMessage(res, 201, filename.homepage, `${doctor.username} registered successfully. Login to continue`);
  }
  return renderPageWithMessage(res, 400, filename.register, 'Username or email is already in use');
};
