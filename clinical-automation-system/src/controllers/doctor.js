import { filename } from 'config';
import { createDoctor, findDoctor, addDetails } from '../services/doctor';
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
    return renderPageWithMessage(res, 201, filename.user.homepage, `${doctor.username} registered successfully. Login to continue`);
  }
  return renderPageWithMessage(res, 400, filename.user.register, 'Username or email is already in use');
};

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => {
  const details = {
    name: req.user.username,
    status: req.session.passport.user.status
  };
  res.render(filename.doctor.dashboard, { details });
};

/**
 * Redirect to doctor details page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDetails = async (req, res) => {
  const doctor = await findDoctor(req.user.username);
  const details = {
    name: doctor.name,
    email: doctor.email,
    status: doctor.status,
    degree: doctor.degree,
    dateOfBirth: doctor.dateOfBirth,
    gender: doctor.gender,
    startTime: doctor.startTime,
    endTime: doctor.endTime,
    experienceFrom: doctor.experienceFrom,
    appointmentFee: doctor.appointmentFee
  };
  return res.render(filename.doctor.details, { details });
};

export const addCredentials = async (req, res) => {
  const doctor = req.body;
  doctor.email = req.user.username;
  doctor.experienceFrom = new Date(req.body.experienceFrom).getTime();

  const result = await addDetails(doctor);
  if (result) {
    req.session.passport.user.status = 'pending';
    res.redirect('/doctor/details');
  }
  return renderPageWithMessage(res, 400, filename.doctor.details, 'Data submitted is not correct');
};
