'use strict';

const { app } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require ('mongoose');

const { TEST_DATABASE_URL } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');

const Review = require('../models/review');
const User = require('../models/user');

const { reviews, users } = require('../db/data');

process.env.NODE_ENV = 'test';

process.stdout.write('\x1Bc\n');

const expect = chai.expect;

chai.use(chaiHttp);

describe('RoadRate - Reviews', function () {
  //Test User Info
  const userData = {
    'name': 'RP Boyle',
    'email': 'rpboyle11@yahoo.com',
    'confirmEmail': 'rpboyle11@yahoo.com',
    'username': 'testUser',
    'password': 'Password123',
    'confirmPassword': 'Password123'
  };
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
            return Promise.all([
              User.createIndexes(),
              Review.insertMany(reviews)
            ]);
          });
      });
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
        .send({ plateNumber, rating, message, 'username': 'testUser', reviewerId, plateState })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('plateId', 'plateNumber', 'isPositive', 'message', 'plateState', '_id', 'id', 'createdAt', 'updatedAt');
          expect(res.body._id).to.exist;
          return Review.findOne({ _id: res.body._id});})
        .then(review => {
          expect(review).to.exist;
          expect(review.plateNumber).to.equal(res.body.plateNumber);
        });
    });
  });

  describe('GET /api/reviews', function () {
    return chai
      .request(app)
      .get('/api/reviews')
      .then(res => {
        console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(res.body.length);
      });
  });  

  // describe('PUT /api/reviews', function () {

  // });

});