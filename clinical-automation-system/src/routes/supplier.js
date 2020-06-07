import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import { redirectDashboard, addCredentials, redirectDetails } from '../controllers/supplier';
import { checkCredentials } from '../middlewares/supplier';
import invalidRoutes from './invalidRoutes';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

// Route to get personal details
router.get('/details', redirectDetails);

// Route to add personal details
router.post('/details', checkCredentials, addCredentials);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
