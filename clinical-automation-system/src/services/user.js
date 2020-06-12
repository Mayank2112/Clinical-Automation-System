import AdminService from './admin';
import DoctorService from './doctor';
import SupplierService from './supplier';
import PatientService from './patient';

const getUserDetails = async email => {
  const admin = await AdminService.find(email);
  if (admin) {
    admin.type = 'admin';
    return admin;
  }

  const doctor = await DoctorService.findDoctor(email);
  if (doctor) {
    doctor.type = 'doctor';
    return doctor;
  }

  const supplier = await SupplierService.findSupplier(email);
  if (supplier) {
    supplier.type = 'supplier';
    return supplier;
  }

  const patient = await PatientService.findPatient(email);
  if (patient) {
    patient.type = 'patient';
    return patient;
  }
};

export default getUserDetails;
