import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import { redirectDashboard } from '../controllers/doctor';
import invalidRoutes from './invalidRoutes';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
