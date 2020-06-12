import { Router } from 'express';
import UserMiddleware from '../middlewares/user';

import User from '../controllers/user';
import invalidRoutes from './invalidRoutes';

const router = Router();
const user = new User();
const userMiddleware = new UserMiddleware();

// Routing for base URL
router.get('/', userMiddleware.resetLoginFailure, user.redirectHome);

// Route for registering user
router.post('/register', userMiddleware.checkUserCredentials, userMiddleware.registerUser);

// Routing for registration page
router.get('/register', user.redirectRegister);

// Login route to authenticate user using local strategy
router.post('/login', userMiddleware.redirectUserToProfessionLogin);

// Routing for login page
router.get('/login', user.redirectLogin);

// Routing for login failure
router.get('/login/failure', userMiddleware.setLoginFailure);

// Routing for logout
router.get('/logout', userMiddleware.destroySession, user.logoutUser);

// Invalid routes or methods
router.all(/ */, invalidRoutes);

export default router;
