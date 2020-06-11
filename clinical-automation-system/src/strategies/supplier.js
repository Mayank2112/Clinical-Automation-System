import { Strategy } from 'passport-local';
import { isValidSupplier } from '../services/supplier';

// Authentication strategy for Supplier
export default new Strategy(
  (username, password, done) => {
    isValidSupplier(username, password)
      .then(result => {
        if (result) {
          return done(null, { username: username });
        }
        return done(null, false);
      });
  });
