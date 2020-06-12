import { Router } from 'express';
import UserMiddleware from '../middlewares/user';
import checkCredentials from '../middlewares/doctor';
import invalidRoutes from './invalidRoutes';
import Appointment from '../middlewares/appointment';
import Doctor from '../controllers/doctor';

const router = Router();
const doctor = new Doctor();
const appointment = new Appointment();
const userMiddleware = new UserMiddleware();

// Dashborad route to access dashboard after login
router.get('/dashboard', userMiddleware.resetLoginFailure, doctor.redirectDashboard);

// Route to get personal details
router.get('/details', doctor.redirectDetails);

// Route to add additional informations of doctors
router.post('/details', checkCredentials, doctor.addCredentials, doctor.redirectDetails);

// Route to get appointment requests
router.get('/appointment-request', doctor.sendAppointmentRequestList);

// Route to handle decision of approve or reject appointment
router.post('/appointment-request', doctor.configureAppointmentRequest);

// Route to get confirmed appointments
router.get('/appointment', doctor.sendAppointmentList);

// Route to add patient report
router.post('/appointment/patient-report', appointment.completed, doctor.saveReport);

// Route to get information of patients
router.get('/appointment/patient-information/:patientId', doctor.sendPatientInformation);

// Route to get information of doctors
router.get('/information/:doctorId', doctor.sendDoctorInformation);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
