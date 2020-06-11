import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import { checkDoctorAvailability, checkAppointmentData } from '../middlewares/appointment';
import { checkMedicineAvailabilty } from '../middlewares/patient';
import invalidRoutes from './invalidRoutes';
import {
  redirectDashboard,
  sendDoctorList,
  makeAppointmentRequest,
  sendAppointmentList,
  sendPersonalDetail,
  sendMakeOrderPage,
  sendOrderDetails,
  createOrder
} from '../controllers/patient';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

// Route to get personal details
router.get('/details', sendPersonalDetail);

// Route for getting confirmed doctors list and make appointments
router.get('/appointment-request', sendDoctorList);

// Route for making appointment requests to doctors
router.post('/appointment-request', checkAppointmentData, checkDoctorAvailability, makeAppointmentRequest);

// Route to get all appointments
router.get('/appointment', sendAppointmentList);

// Route for getting order information
router.get('/order-medicine', sendMakeOrderPage);

// Route for creating order
router.post('/order-medicine', checkMedicineAvailabilty, createOrder);

// Route to get order details
router.get('/orders', sendOrderDetails);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
