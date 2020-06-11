import { Strategy } from 'passport-local';
import { isValidAdmin } from '../services/admin';

// Authentication strategy for Admin
export default new Strategy(
  (username, password, done) => {
    isValidAdmin(username, password)
      .then(result => {
        if (result) {
          return done(null, { username: username });
        }
        return done(null, false);
      });
  });
