import { Strategy } from 'passport-local';
import DoctorService from '../services/doctor';

// Authentication strategy for Doctor
export default new Strategy(
  async (username, password, done) => {
    try {
      await DoctorService.verify(username, password);
      return done(null, { username });
    }
    catch (err) {
      return done(null, false);
    }
  }
);
