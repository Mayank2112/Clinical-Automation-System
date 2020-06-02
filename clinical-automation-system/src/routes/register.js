import { Router } from 'express';
import { methodNotAllowedError, redirectRegister } from '../controllers/user';
import { checkUserCredentials, registerUser } from '../middlewares/user';

const router = Router();

// Route for registering user
router.post('/', checkUserCredentials, registerUser);

router.get('/', redirectRegister);

// Invalid method operation
router.all('/', methodNotAllowedError);

export default router;
