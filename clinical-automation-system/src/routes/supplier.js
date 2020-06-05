import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import { redirectDashboard, addCredentials, redirectDetails } from '../controllers/supplier';
import invalidRoutes from './invalidRoutes';
import { checkCredentials } from '../middlewares/supplier';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

router.get('/details', redirectDetails);

router.post('/details', checkCredentials, addCredentials);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
