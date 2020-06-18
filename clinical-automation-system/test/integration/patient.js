import chai from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';
import app from '../../src/app';
import { deletePatient } from '../helpers/patient';

const { expect } = chai;
chai.use(chaiHttp);

describe('Patient Authentication', () => {
  const patient = {
    username: 'Mayank Parikh',
    dateOfBirth: moment('12-21-1998', 'MM-DD-YYYY'),
    gender: 'male',
    address: 'Indore',
    mobileNumber: '9826942152',
    email: 'patient@gmail.com',
    password: '123456789',
    profession: 'patient'
  };

  describe('Patient Login and Registration', () => {
    after('Should delete patient and return 1', async () => {
      const result = await deletePatient(patient.email);
      expect(result).to.be.equal(1);
    });

    /**
     * Check Registration functionality
     */
    describe('Adding a new patient', () => {
      it('Should return message registered successfully with status 201 if patient register with new credentials', done => {
        chai.request(app)
          .post('/register')
          .send(patient)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.text).to.includes('registered successfully');
            done();
          });
      });

      it('Should return message Email already in use with status 400 if existing patient try to register', done => {
        chai.request(app)
          .post('/register')
          .send(patient)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.includes('email is already in use');
            done();
          });
      });

      it('Should return message Invalid credentials with status 400 if patient register with invalid credentials', done => {
        chai.request(app)
          .post('/register')
          .send({
            username: 'mayank',
            email: 'mayankparikh1',
            password: '123456789'
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.includes('Invalid Credentials');
            done();
          });
      });
    });
  
    it('Redirect to login with status 403 if not login successfully', done => {
      chai.request(app)
        .post('/login')
        .send({ username: 'mayank1234', password: '123456789', profession: 'patient' })
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
  describe('Logout patient', () => {
    it('Should redirect to homepage with status 204 if logout successfully', done => {
      chai.request(app)
        .get('/logout')
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
