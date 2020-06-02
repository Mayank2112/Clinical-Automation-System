import passport from '../lib/passport';

// Middleware for local Authentication for patient
export const patientLocalAuthentication = passport.authenticate('patient-authentication', {
  failureRedirect: '/login/failure',
  successRedirect: '/dashboard',
  session: true
});

// Middleware for local Authentication for doctor
export const doctorLocalAuthentication = passport.authenticate('doctor-authentication', {
  failureRedirect: '/login/failure',
  successRedirect: '/dashboard',
  session: true
});

// Middleware for local Authentication for supplier
export const supplierLocalAuthentication = passport.authenticate('supplier-authentication', {
  failureRedirect: '/login/failure',
  successRedirect: '/dashboard',
  session: true
});

// Middleware for local Authentication for admin
export const adminLocalAuthentication = passport.authenticate('admin-authentication', {
  failureRedirect: '/login/failure',
  successRedirect: '/dashboard',
  session: true
});
