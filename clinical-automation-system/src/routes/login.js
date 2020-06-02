import { Router } from 'express';
import { setLoginFailure, redirectUserToProfessionLogin } from '../middlewares/user';

import {
  redirectLogin,
  methodNotAllowedError
} from '../controllers/user';

const router = Router();

// Login route to authenticate user using local strategy
router.post('/', redirectUserToProfessionLogin);

router.get('/', redirectLogin);

router.get('/failure', setLoginFailure);

// Invalid method operation
router.all('/', methodNotAllowedError);

export default router;
