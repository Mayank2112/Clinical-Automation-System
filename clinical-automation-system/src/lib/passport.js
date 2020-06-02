import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { isValidPatient } from '../services/patient';
import { isValidDoctor } from '../services/doctor';
import { isValidSupplier } from '../services/supplier';
import { isValidAdmin } from '../services/admin'

export const passportSetup = app => {
  // passport middleware setup
  app.use(passport.initialize());
  app.use(passport.session());

  // Used to serialalize the user for session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Used to deserialize the user
  passport.deserializeUser((username, done) => {
    done(null, username);
  });

  // Middleware for local strategy Authentication for Patient
  passport.use('patient-authentication', new localStrategy(
    (username, password, done) => {
      isValidPatient(username, password)
        .then(result => {
          if (result) {
            return done(null, { username: username });
          }
          return done(null, false);
        });
    }
  ));

  // Middleware for local strategy Authentication for Doctor
  passport.use('doctor-authentication', new localStrategy(
    (username, password, done) => {
      isValidDoctor(username, password)
        .then(result => {
          if (result) {
            return done(null, { username: username });
          }
          return done(null, false);
        });
    }
  ));

  // Middleware for local strategy Authentication for Supplier
  passport.use('supplier-authentication', new localStrategy(
    (username, password, done) => {
      isValidSupplier(username, password)
        .then(result => {
          if (result) {
            return done(null, { username: username });
          }
          return done(null, false);
        });
    }
  ));

  // Middleware for local strategy Authentication for Admin
  passport.use('admin-authentication', new localStrategy(
    (username, password, done) => {
      isValidAdmin(username, password)
        .then(result => {
          if (result) {
            return done(null, { username: username });
          }
          return done(null, false);
        });
    }
  ));
};

export default passport;
