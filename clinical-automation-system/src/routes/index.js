import { Router } from 'express';
import { isAdminLoggedIn } from '../middlewares/admin';
import { isDoctorLoggedIn } from '../middlewares/doctor';
import { isPatientLoggedIn } from '../middlewares/patient';
import { isSupplierLoggedIn } from '../middlewares/supplier';
import user from './user';
import admin from './admin';
import doctor from './doctor';
import patient from './patient';
import supplier from './supplier';

const router = Router();

// Routes for admin
router.use('/admin', isAdminLoggedIn, admin);

// Routes for doctors
router.use('/doctor', isDoctorLoggedIn, doctor);

// Routes for patients
router.use('/patient', isPatientLoggedIn, patient);

// Routes for suppliers
router.use('/supplier', isSupplierLoggedIn, supplier);

// Routes for general users
router.use('/', user);

export default router;
