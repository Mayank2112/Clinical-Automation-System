import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import { checkCredentials } from '../middlewares/doctor';
import invalidRoutes from './invalidRoutes';
import {
  redirectDashboard,
  redirectDetails,
  addCredentials,
  sendAppointmentRequestList,
  configureAppointmentRequest,
  sendAppointmentList,
  sendPatientInformation,
  saveReport,
  sendDoctorInformation
} from '../controllers/doctor';
import { appointmentCompleted } from '../middlewares/appointment';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

router.get('/details', redirectDetails);

router.post('/details', checkCredentials, addCredentials, redirectDetails);

router.get('/appointmentRequest', sendAppointmentRequestList);

router.post('/appointmentRequest', configureAppointmentRequest);

router.get('/appointment', sendAppointmentList);

router.post('/appointment/patient-report', appointmentCompleted, saveReport);

router.get('/appointment/patient-information/:patientId', sendPatientInformation);

router.get('/information/:doctorId', sendDoctorInformation);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
