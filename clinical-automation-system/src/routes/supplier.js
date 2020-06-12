import { Router } from 'express';
import UserMiddleware from '../middlewares/user';
import checkCredentials from '../middlewares/supplier';
import invalidRoutes from './invalidRoutes';
import Supplier from '../controllers/supplier';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', UserMiddleware.resetLoginFailure, Supplier.redirectDashboard);

// Route to get personal details
router.get('/details', Supplier.redirectDetails);

// Route to add personal details
router.post('/details', checkCredentials, Supplier.addCredentials);

// Route to get order details
router.get('/orders', Supplier.sendOrders);

// Route to get information of patients
router.get('/patient-information/:patientId', Supplier.sendPatientInformation);

// Route to set order status delivered
router.get('/order-delivered/:orderId', Supplier.orderDelivered);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
