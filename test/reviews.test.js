'use strict';

const { app } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require ('mongoose');

const { TEST_DATABASE_URL } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');

const Review = require('../models/review');

const expect = chai.expect;

chai.use(chaiHttp);

describe('RoadRate - Users', function () {
  //Test User Info
  const userData = {
    'name': 'RP Boyle',
    'email': 'rpboyle11@yahoo.com',
    'confirmEmail': 'rpboyle11@yahoo.com',
    'username': 'testUser',
    'password': 'Password123',
    'confirmPassword': 'Password123'
  }
  let token = null;
  let userId = null;

  //Test Review Info
  const plateNumber = 'TEST-1234';
  const plateState = 'PA';
  const rating = true;
  const message = 'This guys an ass hat!';
  let reviewerId = null;


  before(function () {
    return dbConnect(TEST_DATABASE_URL)
      .then(() => User.deleteMany());
  });
  beforeEach(function () {
    return chai
      .request(app)
      .post('/api/users')
      .send(userData)
      .then(() => {
        return chai
          .request(app)
          .post('/api/auth/login')
          .send({ 'username': 'testUser', 'password': 'Password123' })
          .then(data => {
            token = data.body.authToken;
            reviewerId = data.body.id;
            return User.createIndexes();
          })
      })
  });
  afterEach(function () {
    return User.deleteMany();
  });
  after(function () {
    return dbDisconnect();
  });

  describe('POST /api/reviews', function () {
  
    it('Should create a new review', function () {
      let res;
      return chai
        .request(app)
        .post('/api/reviews')
        .send({ plateNumber, rating, message, username, reviewerId, plateState })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('id', 'username', 'name');
          expect(res.body.id).to.exist;
          expect(res.body.username).to.equal(username);
          return User.findOne({ username: 'exampleUser'}); 
        })
        .then(user => {
          expect(user).to.exist;
          expect(user.id).to.equal(res.body.id);
          return user.validatePassword(password);
        })
        .then(isValid => {
          expect(isValid).to.be.true;
        });
    });

  });