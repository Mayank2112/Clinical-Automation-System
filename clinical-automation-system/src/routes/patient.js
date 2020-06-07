import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import { checkDoctorAvailability, checkAppointmentData } from '../middlewares/appointment';
import invalidRoutes from './invalidRoutes';
import {
  redirectDashboard,
  sendDoctorList,
  makeAppointmentRequest,
  sendAppointmentList
} from '../controllers/patient';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

// Route for getting confirmed doctors list and make appointments
router.get('/appointmentRequest', sendDoctorList);

// Route for making appointment requests to doctors
router.post('/appointmentRequest', checkAppointmentData, checkDoctorAvailability, makeAppointmentRequest);

// Route to get all appointments
router.get('/appointment', sendAppointmentList);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
