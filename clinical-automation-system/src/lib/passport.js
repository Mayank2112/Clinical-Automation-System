import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { isValidPatient } from '../services/patient';
import { isValidDoctor } from '../services/doctor';
import { isValidSupplier } from '../services/supplier';
import { isValidAdmin } from '../services/admin';
import { getUserDetails } from '../services/user';

export const passportSetup = app => {
  // passport middleware setup
  app.use(passport.initialize());
  app.use(passport.session());

  // Used to serialalize the user for session
  passport.serializeUser(async (user, done) => {
    const userInfo = await getUserDetails(user.username);
    if (userInfo) {
      user.type = userInfo.type;
      user.status = userInfo.status;
    }
    done(null, user);
  });

  // Used to deserialize the user
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Middleware for local strategy Authentication for Patient
  passport.use('patient-authentication', new LocalStrategy(
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
  passport.use('doctor-authentication', new LocalStrategy(
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
  passport.use('supplier-authentication', new LocalStrategy(
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
  passport.use('admin-authentication', new LocalStrategy(
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

  // Middleware for google strategy of Authentication
  passport.use(new GoogleStrategy({
    clientID: process.env.AUTH_ID,
    clientSecret: process.env.AUTH_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
    (token, refreshToken, profile, done) => {
      return done(null, {
        username: profile.emails[0].value,
        token: token
      });
    }
  ));
};

export default passport;
