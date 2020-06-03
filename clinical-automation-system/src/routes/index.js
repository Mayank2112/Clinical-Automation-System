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

router.use('/admin', isAdminLoggedIn, admin);

router.use('/doctor', isDoctorLoggedIn, doctor);

router.use('/patient', isPatientLoggedIn, patient);

router.use('/supplier', isSupplierLoggedIn, supplier);

router.use('/', user);

export default router;
