import { Router } from 'express';
import { registerUser, methodNotAllowedError, redirectRegister } from '../controllers/user';
import { checkUserCredentials } from '../middlewares/user';

const router = Router();

// Route for registering user
router.post('/', checkUserCredentials, registerUser);

router.get('/', redirectRegister);

// Invalid method operation
router.all('/', methodNotAllowedError);

export default router;
