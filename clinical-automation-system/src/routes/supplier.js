import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import { checkCredentials } from '../middlewares/supplier';
import invalidRoutes from './invalidRoutes';
import {
  redirectDashboard,
  addCredentials,
  redirectDetails,
  sendOrders,
  orderDelivered,
  sendPatientInformation
} from '../controllers/supplier';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

// Route to get personal details
router.get('/details', redirectDetails);

// Route to add personal details
router.post('/details', checkCredentials, addCredentials);

// Route to get order details
router.get('/orders', sendOrders);

// Route to get information of patients
router.get('/patient-information/:patientId', sendPatientInformation);

// Route to set order status delivered
router.get('/order-delivered/:orderId', orderDelivered);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
