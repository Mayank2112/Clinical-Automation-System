import { Strategy } from 'passport-local';
import { isValidDoctor } from '../services/doctor';

// Authentication strategy for Doctor
export default new Strategy(
  (username, password, done) => {
    isValidDoctor(username, password)
      .then(result => {
        if (result) {
          return done(null, { username: username });
        }
        return done(null, false);
      });
  });
