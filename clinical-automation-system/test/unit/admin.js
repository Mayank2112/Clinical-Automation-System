import moment from 'moment';
import { expect } from 'chai';
import AdminService from '../../src/services/admin';
import { createAdmin, deleteAdmin } from '../helpers/admin';
import getUserDetails from '../../src/services/user';

describe('Admin Credentials', () => {
  const admin = {
    name: 'Mayank Parikh',
    gender: 'male',
    address: 'Indore',
    mobileNumber: '9826942152',
    email: 'mayank@admin.com',
    password: '123456789'
  };

  before('Create Admin to database', async () => {
    const result = await createAdmin(admin);
  });

  after('Delete Admin from database', async () => {
    const result = await deleteAdmin(admin.email);
  });

  it('Should return admin details if admin email is correct', async () => {
    const result = await AdminService.find(admin.email);
    expect(result).to.be.a('Object')
      .to.include({ email: admin.email })
      .to.have.property('id');
    expect(Object.keys(result)).with.lengthOf(9);
  });

  it('Should return error if admin email is not correct', async () => {
    let result;
    try {
      result = await AdminService.find('mayank@techracers.io');
    }
    catch (err) {
      result = err;
    }
    expect(result).to.be.a('Error');
  });

  it('Should return admin type', async () => {
    const result = await getUserDetails(admin.email);
    expect(result).to.be.a('Object')
      .to.include({ type: 'admin' });
  });

  it('Should return true if admin login credentials are correct', async () => {
    const result = await AdminService.verify(admin.email, '123456789');
    expect(result).to.be.equal(true);
  });

  it('Should return false if admin login credentials are not correct', async () => {
    const result = await AdminService.verify(admin.email, '12345689');
    expect(result).to.be.equal(false);
  });
});

describe('Add medicines to store', () => {
  const medicine = {
    name: 'Pain Killer',
    manufacturingDate: moment('11-12-2018', 'MM-DD-YYYY'),
    expiryDate: moment('11-12-2020', 'MM-DD-YYYY'),
    pricePerTablet: '8',
    quantity: 1000
  };

  it('Should return Medicine Object if medicine added successfully', async () => {
    const result = await AdminService.addNewMedicine(medicine);
    expect(result).to.be.a('Object')
      .to.have.property('dataValues');
  });

  it('Should return error if medicine already exist', async () => {
    let result;
    try {
      result = await AdminService.addNewMedicine(medicine);
    }
    catch (err) {
      result = err;
    }
    expect(result).to.be.a('Error');
  });
});
