import { Strategy } from 'passport-local';
import AdminService from '../services/admin';

// Authentication strategy for Admin
export default new Strategy(
  async (username, password, done) => {
    try {
      await AdminService.verify(username, password);
      return done(null, { username });
    }
    catch (err) {
      return done(null, false);
    }
  }
);
