import { Strategy } from 'passport-local';
import PatientService from '../services/patient';

// Authentication strategy for Patient
export default new Strategy(
  async (username, password, done) => {
    try {
      await PatientService.verify(username, password);
      return done(null, { username });
    }
    catch (err) {
      return done(null, false);
    }
  }
);
