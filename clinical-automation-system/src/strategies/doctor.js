import { Strategy } from 'passport-local';
import DoctorService from '../services/doctor';

// Authentication strategy for Doctor
export default new Strategy(
  async (username, password, done) => {
    const result = await DoctorService.isValidDoctor(username, password);
    if (result) {
      return done(null, { username });
    }
    return done(null, false);
  }
);
