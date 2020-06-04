import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import { redirectDashboard, redirectDoctorRequest, configureDoctor } from '../controllers/admin';
import invalidRoutes from './invalidRoutes';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

router.get('/doctorRequest', redirectDoctorRequest);

router.post('/doctorRequest', configureDoctor);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
