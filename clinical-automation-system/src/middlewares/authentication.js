import passport from '../lib/passport';

// Middleware for local Authentication for patient
export const patientLocalAuthentication = passport.authenticate('patient-authentication', {
  failureRedirect: '/login/failure',
  successRedirect: '/patient/dashboard',
  session: true
});

// Middleware for local Authentication for doctor
export const doctorLocalAuthentication = passport.authenticate('doctor-authentication', {
  failureRedirect: '/login/failure',
  successRedirect: '/doctor/dashboard',
  session: true
});

// Middleware for local Authentication for supplier
export const supplierLocalAuthentication = passport.authenticate('supplier-authentication', {
  failureRedirect: '/login/failure',
  successRedirect: '/supplier/dashboard',
  session: true
});

// Middleware for local Authentication for admin
export const adminLocalAuthentication = passport.authenticate('admin-authentication', {
  failureRedirect: '/login/failure',
  successRedirect: '/admin/dashboard',
  session: true
});

// Middleware for Google Authentication
export const googleAuthenticationRequest = passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.email']
});

// Middleware for google callback authentication process
export const googleAuthenticationCallback = passport.authenticate('google', {
  failureRedirect: '/login/failure',
  session: true
});
