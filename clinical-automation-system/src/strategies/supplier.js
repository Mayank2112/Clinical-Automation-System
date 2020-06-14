import { Strategy } from 'passport-local';
import SupplierService from '../services/supplier';

// Authentication strategy for Supplier
export default new Strategy(
  async (username, password, done) => {
    try {
      await SupplierService.verify(username, password);
      return done(null, { username });
    }
    catch (err) {
      return done(null, false);
    }
  }
);
