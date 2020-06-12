import { Router } from 'express';
import User from '../controllers/user';

const router = Router();

// Invalid method operation
router.all('/', User.methodNotAllowedError);

// Invalid URL operation
router.all(/ */, User.resourceNotFoundError);

export default router;
