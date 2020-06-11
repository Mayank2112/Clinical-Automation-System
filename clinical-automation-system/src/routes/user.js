import { Router } from 'express';
import invalidRoutes from './invalidRoutes';
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
  logoutUser,
  googleAuthenticationResponseHandler
} from '../controllers/user';

import {
  googleAuthenticationRequest,
  googleAuthenticationCallback
} from '../middlewares/authentication';

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

// Login route to authenticate user using google OAuth strategy
router.get('/login/auth/google', googleAuthenticationRequest);

// Callback end point, google calls after verification
router.get('/login/auth/google/callback',
  googleAuthenticationCallback,
  googleAuthenticationResponseHandler);

// Routing for login failure
router.get('/login/failure', setLoginFailure);

// Routing for logout
router.get('/logout', destroySession, logoutUser);

// Invalid routes or methods
router.all(/ */, invalidRoutes);

export default router;
