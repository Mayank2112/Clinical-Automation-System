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

router.get('/appointmentRequest', sendDoctorList);

router.post('/appointmentRequest', checkAppointmentData, checkDoctorAvailability, makeAppointmentRequest);

router.get('/appointment', sendAppointmentList);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
