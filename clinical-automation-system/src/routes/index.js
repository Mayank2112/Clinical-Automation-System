import { Router } from 'express';
import user from './user';
import admin from './admin';
import doctor from './doctor';
import patient from './patient';
import supplier from './supplier';
import LoggedIn from '../middlewares/loggedIn';

const router = Router();
const loggedIn = new LoggedIn();

// Routes for admin
router.use('/admin', loggedIn.admin, admin);

// Routes for doctors
router.use('/doctor', loggedIn.doctor, doctor);

// Routes for patients
router.use('/patient', loggedIn.patient, patient);

// Routes for suppliers
router.use('/supplier', loggedIn.supplier, supplier);

// Routes for general users
router.use('/', user);

export default router;
