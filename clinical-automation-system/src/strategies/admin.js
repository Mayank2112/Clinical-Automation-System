import { Strategy } from 'passport-local';
import AdminService from '../services/admin';

// Authentication strategy for Admin
export default new Strategy(
  async (username, password, done) => {
    const result = await AdminService.isValidAdmin(username, password);

    if (result) {
      return done(null, { username });
    }
    return done(null, false);
  }
);
