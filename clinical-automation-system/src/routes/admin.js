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

router.get('/doctorRequest', redirectDoctorRequest);

router.post('/doctorRequest', configureDoctor);

router.get('/supplierRequest', redirectSupplierRequest);

router.post('/supplierRequest', configureSupplier);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
