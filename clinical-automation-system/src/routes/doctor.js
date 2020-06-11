import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import { checkCredentials } from '../middlewares/doctor';
import invalidRoutes from './invalidRoutes';
import { appointmentCompleted } from '../middlewares/appointment';
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

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

// Route to get personal details
router.get('/details', redirectDetails);

// Route to add additional informations of doctors
router.post('/details', checkCredentials, addCredentials, redirectDetails);

// Route to get appointment requests
router.get('/appointment-request', sendAppointmentRequestList);

// Route to handle decision of approve or reject appointment
router.post('/appointment-request', configureAppointmentRequest);

// Route to get confirmed appointments
router.get('/appointment', sendAppointmentList);

// Route to add patient report
router.post('/appointment/patient-report', appointmentCompleted, saveReport);

// Route to get information of patients
router.get('/appointment/patient-information/:patientId', sendPatientInformation);

// Route to get information of doctors
router.get('/information/:doctorId', sendDoctorInformation);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
