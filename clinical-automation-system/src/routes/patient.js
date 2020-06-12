import { Router } from 'express';
import UserMiddleware from '../middlewares/user';
import Appointment from '../middlewares/appointment';
import { checkMedicineAvailabilty } from '../middlewares/patient';
import invalidRoutes from './invalidRoutes';
import Patient from '../controllers/patient';

const router = Router();
const patient = new Patient();
const appointment = new Appointment();
const userMiddleware = new UserMiddleware();

// Dashborad route to access dashboard after login
router.get('/dashboard', userMiddleware.resetLoginFailure, patient.redirectDashboard);

// Route to get personal details
router.get('/details', patient.sendPersonalDetail);

// Route for getting confirmed doctors list and make appointments
router.get('/appointment-request', patient.sendDoctorList);

// Route for making appointment requests to doctors
router.post('/appointment-request',
  appointment.checkData,
  appointment.checkDoctorAvailability,
  patient.makeAppointmentRequest);

// Route to get all appointments
router.get('/appointment', patient.sendAppointmentList);

// Route for getting order information
router.get('/order-medicine', patient.sendMakeOrderPage);

// Route for creating order
router.post('/order-medicine', checkMedicineAvailabilty, patient.createOrder);

// Route to get order details
router.get('/orders', patient.sendOrderDetails);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
