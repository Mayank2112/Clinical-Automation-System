import { Router } from 'express';
import { resourceNotFoundError, methodNotAllowedError } from '../controllers/user';

const router = Router();

// Invalid method operation
router.all('/', methodNotAllowedError);

// Invalid URL operation
router.all(/ */, resourceNotFoundError);

export default router;
