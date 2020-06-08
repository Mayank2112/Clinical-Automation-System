import { Router } from 'express';
import { resetLoginFailure } from '../middlewares/user';
import invalidRoutes from './invalidRoutes';
import {
  redirectDashboard,
  redirectDoctorRequest,
  configureDoctor,
  redirectSupplierRequest,
  configureSupplier,
  addMedicine,
  sendAddMedicinesPage
} from '../controllers/admin';

const router = Router();

// Dashborad route to access dashboard after login
router.get('/dashboard', resetLoginFailure, redirectDashboard);

// Route to see doctor requests
router.get('/doctorRequest', redirectDoctorRequest);

// Route to handle admin decision on doctor requests
router.post('/doctorRequest', configureDoctor);

// Route to see supplier requests
router.get('/supplierRequest', redirectSupplierRequest);

// Route to handle admin decision on supplier requests
router.post('/supplierRequest', configureSupplier);

// Route for admin to give medicine information to store in database
router.get('/medicine', sendAddMedicinesPage);

// Rout for admin to add medicines
router.post('/medicine', addMedicine);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
