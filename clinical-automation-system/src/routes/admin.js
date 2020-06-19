import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import invalidRoutes from './invalidRoutes';
import {
  redirectDashboard,
  redirectDoctorRequest,
  configureDoctor,
  redirectSupplierRequest,
  configureSupplier
} from '../controllers/admin';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

// Route to see doctor requests
router.get('/doctor-request', redirectDoctorRequest);

// Route to handle admin decision on doctor requests
router.post('/doctor-request', configureDoctor);

// Route to see supplier requests
router.get('/supplier-request', redirectSupplierRequest);

// Route to handle admin decision on supplier requests
router.post('/supplier-request', configureSupplier);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
