import { Strategy } from 'passport-local';
import PatientService from '../services/patient';

// Authentication strategy for Patient
export default new Strategy(
  async (username, password, done) => {
    const result = await PatientService.isValidPatient(username, password);
    if (result) {
      return done(null, { username });
    }
    return done(null, false);
  }
);
