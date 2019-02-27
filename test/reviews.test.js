'use strict';

const { app } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require ('mongoose');

const jwt = require('jsonwebtoken');
const { TEST_DATABASE_URL, JWT_SECRET, JWT_EXPIRY } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');

const Review = require('../models/review');
const User = require('../models/user');
const Plate = require('../models/plate');

const { reviews, users, plates } = require('../db/data');

process.env.NODE_ENV = 'test';

process.stdout.write('\x1Bc\n');

const expect = chai.expect;

chai.use(chaiHttp);

describe('RoadRate - Reviews', function () {
  let token;
  let user;

  //Test Review Info
  const plateNumber = 'TEST-1234';
  const plateState = 'PA';
  const rating = true;
  const message = 'This guys an ass hat!';
  let reviewerId = null;

  before(function () {
    return dbConnect(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return Promise.all([
      User.deleteMany(),
      Plate.deleteMany(),
      Review.deleteMany(), 
    ])
      .then(() => {
        return Promise.all([
          User.insertMany(users),
          User.createIndexes(),
          Plate.insertMany(plates),
          Review.insertMany(reviews)
        ])
          .then(results => {
            console.log('results from testing',results);
            const userResults = results[0];
            user = userResults[0];
            token =  jwt.sign( { user }, JWT_SECRET, {
              subject: user.username,
              expiresIn: JWT_EXPIRY
            });
          });
      });
  });

  afterEach(function () {
    return (() => {
      User.deleteMany();
      Plate.deleteMany();
      Review.deleteMany();
    });
  });
  after(function () {
    return dbDisconnect();
  });

  describe('POST /api/reviews', function () {
  
    it('Should create a new review', function () {
      this.timeout(5000);
      let res;
      return chai
        .request(app)
        .post('/api/reviews')
        .send({ plateNumber, rating, message, 'username': user.username, reviewerId, plateState })
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
    
    it('Should get all reviews', function () {
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

    it('Should get all reviews left by the current user', function () {
      return chai
        .request(app)
        .get(`/api/reviews/${user.id}`)
        .then(res => {
          console.log(res);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(res.body.length);
        });
    });

    // it('Should get all reviews about a specific plate', function () {
    //   plateId = 
    //   return chai
    //     .request(app)
    //     .get(`/api/reviews/my-plates/${plateId}`)
    // });

  });  

  // describe('PUT /api/reviews', function () {

  // });

});