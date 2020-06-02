import { Router } from 'express';
import register from './register';
import homepage from './home';
import invalidRoutes from './invalidRoutes';

const router = Router();

router.use('/register', register);

router.use('/', homepage);

router.all(/ */, invalidRoutes);

export default router;
