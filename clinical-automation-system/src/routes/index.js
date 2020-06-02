import { Router } from 'express';
import register from './register';
import login from './login';
import homepage from './home';
import invalidRoutes from './invalidRoutes';
import dashboard from './dashboard';

const router = Router();

router.use('/register', register);

router.use('/login', login);

router.use('/dashboard', dashboard);

router.use('/', homepage);

router.all(/ */, invalidRoutes);

export default router;
