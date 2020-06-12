import { Router } from 'express';
import User from '../controllers/user';

const router = Router();
const user = new User();

// Invalid method operation
router.all('/', user.methodNotAllowedError);

// Invalid URL operation
router.all(/ */, user.resourceNotFoundError);

export default router;
