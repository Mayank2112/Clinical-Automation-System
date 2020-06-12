import { Router } from 'express';
import UserMiddleware from '../middlewares/user';
import checkCredentials from '../middlewares/supplier';
import invalidRoutes from './invalidRoutes';
import Supplier from '../controllers/supplier';

const router = Router();
const supplier = new Supplier();
const userMiddleware = new UserMiddleware();

// Dashborad route to access dashboard after login
router.get('/dashboard', userMiddleware.resetLoginFailure, supplier.redirectDashboard);

// Route to get personal details
router.get('/details', supplier.redirectDetails);

// Route to add personal details
router.post('/details', checkCredentials, supplier.addCredentials);

// Route to get order details
router.get('/orders', supplier.sendOrders);

// Route to get information of patients
router.get('/patient-information/:patientId', supplier.sendPatientInformation);

// Route to set order status delivered
router.get('/order-delivered/:orderId', supplier.orderDelivered);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
