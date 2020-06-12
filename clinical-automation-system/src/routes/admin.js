import { Router } from 'express';
import UserMiddleware from '../middlewares/user';
import invalidRoutes from './invalidRoutes';
import Admin from '../controllers/admin';

const router = Router();
const admin = new Admin();
const userMiddleware = new UserMiddleware();

// Dashborad route to access dashboard after login
router.get('/dashboard', userMiddleware.resetLoginFailure, admin.redirectDashboard);

// Route to see doctor requests
router.get('/doctor-request', admin.redirectDoctorRequest);

// Route to handle admin decision on doctor requests
router.post('/doctor-request', admin.configureDoctor);

// Route to see supplier requests
router.get('/supplier-request', admin.redirectSupplierRequest);

// Route to handle admin decision on supplier requests
router.post('/supplier-request', admin.configureSupplier);

// Route for admin to give medicine information to store in database
router.get('/medicine', admin.sendAddMedicinesPage);

// Rout for admin to add medicines
router.post('/medicine', admin.addMedicine);

// Invalid routes or methods
router.all('/', invalidRoutes);

export default router;
