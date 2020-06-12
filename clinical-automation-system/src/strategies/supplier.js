import { Strategy } from 'passport-local';
import SupplierService from '../services/supplier';

// Authentication strategy for Supplier
export default new Strategy(
  async (username, password, done) => {
    const result = await SupplierService.isValidSupplier(username, password);
    if (result) {
      return done(null, { username });
    }
    return done(null, false);
  }
);
