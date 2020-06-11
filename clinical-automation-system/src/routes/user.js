import { Router } from 'express';
import {
  resetLoginFailure,
  checkUserCredentials,
  registerUser,
  redirectUserToProfessionLogin,
  setLoginFailure,
  destroySession
} from '../middlewares/user';

import {
  redirectHome,
  redirectRegister,
  redirectLogin,
  logoutUser
} from '../controllers/user';
import invalidRoutes from './invalidRoutes';

const router = Router();

// Routing for base URL
router.get('/', resetLoginFailure, redirectHome);

// Route for registering user
router.post('/register', checkUserCredentials, registerUser);

// Routing for registration page
router.get('/register', redirectRegister);

// Login route to authenticate user using local strategy
router.post('/login', redirectUserToProfessionLogin);

// Routing for login page
router.get('/login', redirectLogin);

// Routing for login failure
router.get('/login/failure', setLoginFailure);

// Routing for logout
router.get('/logout', destroySession, logoutUser);

// Invalid routes or methods
router.all(/ */, invalidRoutes);

export default router;
