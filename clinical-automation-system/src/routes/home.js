import { Router } from 'express';
import { redirectHome, methodNotAllowedError } from '../controllers/user';
import { resetLoginFailure } from '../middlewares/user';

const router = Router();

// Routing for base URL
router.get('/', resetLoginFailure, redirectHome);

// Invalid method operation
router.all('/', methodNotAllowedError);

export default router;
