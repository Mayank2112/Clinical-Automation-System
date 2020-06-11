import { Strategy } from 'passport-local';
import { isValidPatient } from '../services/patient';

// Authentication strategy for Patient
export default new Strategy(
  (username, password, done) => {
    isValidPatient(username, password)
      .then(result => {
        if (result) {
          return done(null, { username: username });
        }
        return done(null, false);
      });
  });
