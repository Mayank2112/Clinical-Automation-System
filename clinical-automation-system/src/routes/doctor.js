import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import { redirectDashboard, redirectDetails, addCredentials } from '../controllers/doctor';
import { checkCredentials } from '../middlewares/doctor';
import invalidRoutes from './invalidRoutes';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

router.get('/details', redirectDetails);

router.post('/details', checkCredentials, addCredentials, redirectDetails);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
