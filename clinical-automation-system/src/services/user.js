import { findAdmin } from "./admin";
import { findDoctor } from "./doctor";
import { findSupplier } from "./supplier";
import { findPatient } from "./patient";

export const getUserDetails = async email => {
  const admin = await findAdmin(email);
  if (admin) {
    admin.type = 'admin';
    return admin;
  }

  const doctor = await findDoctor(email);
  if (doctor) {
    doctor.type = 'doctor';
    return doctor;
  }

  const supplier = await findSupplier(email);
  if (supplier) {
    supplier.type = 'supplier';
    return supplier;
  }

  const patient = await findPatient(email);
  if (patient) {
    patient.type = 'patient';
    return patient;
  }
};
