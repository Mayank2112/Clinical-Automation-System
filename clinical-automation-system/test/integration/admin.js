import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import { createAdmin, deleteAdmin } from '../helpers/admin';

const { expect } = chai;
chai.use(chaiHttp);

describe('Admin Authentication', () => {
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

  it('Redirect to dashboard with status 200 if login successfully', done => {
    chai.request(app)
      .post('/login')
      .send({ username: admin.email, password: admin.password, profession: 'admin' })
      .end((err, res) => {
        expect(res).to.redirectTo(/\/admin\/dashboard$/);
        done();
      });
  });

  it('Redirect to login with status 403 if not login successfully', done => {
    chai.request(app)
      .post('/login')
      .send({ username: 'mayank1234', password: '123456789', profession: 'admin' })
      .end((err, res) => {
        expect(res).to.have.status(403)
          .to.redirectTo(/\/login$/);
        expect(res.text).to.include('Invalid Login credentials');
        done();
      });
  });
});

/**
 * Check Logout functionality
 */
describe('Logout admin', () => {
  it('Should redirect to homepage with status 204 if logout successfully', done => {
    chai.request(app)
      .get('/logout')
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});
