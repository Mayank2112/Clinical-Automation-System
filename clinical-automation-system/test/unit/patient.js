import moment from 'moment';
import { expect } from 'chai';
import { v4 } from 'uuid';
import getUserDetails from '../../src/services/user';
import { deletePatient, deleteMedicine, deleteOrder } from '../helpers/patient';
import PatientService from '../../src/services/patient';

describe('Patient functionalities', () => {
  const patient = {
    username: 'Mayank Parikh',
    dateOfBirth: moment('12-21-1998', 'MM-DD-YYYY'),
    gender: 'male',
    address: 'Indore',
    mobileNumber: '9826942152',
    email: 'mayank@patient.com',
    password: '123456789'
  };

  describe('Patient Login and Registration', () => {
    after('Should delete patient and return 1', async () => {
      const result = await deletePatient(patient.email);
      expect(result).to.be.equal(1);
    });

    it('Should create patient entry in database', async () => {
      const result = await PatientService.add(patient);
      expect(result).to.be.a('Object')
        .to.have.property('dataValues');
      expect(result.dataValues)
        .to.be.a('Object')
        .to.include({ email: patient.email });
      patient.id = result.dataValues.id;
    });

    it('Should return error if try to register with already registered email', async () => {
      let result;
      try {
        result = await PatientService.add(patient);
      }
      catch (err) {
        result = err;
      }
      expect(result).to.be.a('Error');
    });

    it('Should return patient type', async () => {
      const result = await getUserDetails(patient.email);
      expect(result).to.be.a('Object')
        .to.include({ type: 'patient' });
    });

    it('Should return patient details if patient email is correct', async () => {
      const result = await PatientService.find(patient.email);
      expect(result).to.be.a('Object')
        .to.include({ id: patient.id })
        .to.have.property('email');
    });

    it('Should return error if patient email is not correct', async () => {
      let result;
      try {
        result = await PatientService.find('mayank@techracers.io');
      }
      catch (err) {
        result = err;
      }
      expect(result).to.be.a('Error');
    });

    it('Should return patient with given patient id ', async () => {
      const result = await PatientService.findById(patient.id);
      expect(result).to.be.a('Object')
        .to.include({ id: patient.id })
        .to.have.property('email');
    });

    it('Should return error if patient id is not correct ', async () => {
      let result;
      try {
        result = await PatientService.findById(v4());
      }
      catch (err) {
        result = err;
      }
      expect(result).to.be.a('Error');
    });

    it('Should return true if patient login credentials are correct', async () => {
      const result = await PatientService.verify(patient.email, patient.password);
      expect(result).to.be.equal(true);
    });

    it('Should return false if patient password is not correct', async () => {
      const result = await PatientService.verify(patient.email, '12345689');
      expect(result).to.be.equal(false);
    });

    it('Should return error if patient email is not correct', async () => {
      let result;
      try {
        result = await PatientService.verify('mayank@techracers.io', patient.password);
      }
      catch (err) {
        result = err;
      }
      expect(result).to.be.a('Error');
    });
  });

  describe('Order-medicine', () => {
    const order = {
      medicineName: 'Pain Killer',
      quantity: 10,
      date: moment('06-09-2020', 'MM-DD-YYYY'),
      status: 'confirmed'
    };

    after('Should delete medicine added while testing', async () => {
      const result = await deleteMedicine(order.medicineName);
      expect(result).to.be.equal(1);
    });

    after('Should delete order added while testing', async () => {
      const result = await deleteOrder(order.patientId);
      expect(result).to.be.equal(1);
    });

    it('Should return medicine details if medicine is available at store', async () => {
      const result = await PatientService.findMedicine(order.medicineName);
      expect(result).to.be.a('Array')
        .to.be.lengthOf(1);
      expect(result[0].dataValues)
        .to.be.a('Object')
        .to.include({ name: order.medicineName });
    });

    it('Should return error if medicine is not available', async () => {
      let result;
      try {
        result = await PatientService.findMedicine();
      }
      catch (err) {
        result = err;
      }
      expect(result).to.be.a('Error');
    });

    it('Should create order entry in database', async () => {
      order.patientId = patient.id;
      const result = await PatientService.addOrder(order);
      expect(result).to.be.a('Object')
        .to.have.property('dataValues');
      expect(result.dataValues).to.be.a('Object');
    });

    it('Should return error if order does not contain medicine', async () => {
      const orderDetails = { order };
      orderDetails.medicineName = null;
      let result;
      try {
        result = await PatientService.addOrder(orderDetails);
      }
      catch (err) {
        result = err;
      }
      expect(result).to.be.a('Error');
    });

    it('Should return list of patient orders', async () => {
      const result = await PatientService.findOrders(order.patientId);
      expect(result).to.be.a('Array')
        .to.be.lengthOf(1);
      expect(result[0].dataValues)
        .to.be.a('Object')
        .to.include({ medicineName: order.medicineName });
    });
  });
});
