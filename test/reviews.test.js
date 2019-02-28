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
  let testReview;
  let testPlate;
  let ownerResponse = 'This is the test owner response';
  let reviewId;
  let plateId;

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
    this.timeout(5000);
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
            const userResults = results[0];
            const plateResults = results[2];
            const reviewResults = results[3];
            user = userResults[0];
            testPlate = plateResults[0];
            plateId = testPlate._id;
            testReview = reviewResults[1];
            reviewId = testReview._id;
            token =  jwt.sign( { user }, JWT_SECRET, {
              subject: user.username,
              expiresIn: JWT_EXPIRY
            });
          });
      });
  });

  afterEach(function () {
    this.timeout(5000);
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
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(res.body.length);
        });
    });

    it('Should get all reviews about a specific plate that\'s accessible to the public', function () {
      return chai
        .request(app)
        .get(`/api/reviews/plate/${plateId}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(res.body.length);
        });
    });

    it('Should get all reviews about my specific plate', function () {
      return chai
        .request(app)
        .get(`/api/reviews/my-plates/${plateId}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(res.body.length);
        });
    });

    it('Should get all reviews about a specific plate that matches plateState and plateNumber', function () {
      return chai
        .request(app)
        .get(`/api/reviews/${testPlate.plateState}/${testPlate.plateNumber}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(res.body.length);
        });
    });

    it('Should get one review by searching with its id', function () {
      return chai
        .request(app)
        .get(`/api/reviews/${reviewId}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(1);
        });
    });
  });  

  describe('PUT /api/reviews', function () {
    
    it('Should add an ownerResponse to a review that already exists', function () {
      return chai
        .request(app)
        .put(`/api/reviews/${reviewId}`)
        .send({
          ownerResponse
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.keys('plateId', 'plateNumber', 'isPositive', 'message', 'plateState', '_id', 'id', 'createdAt', 'updatedAt', 'ownerResponse');
          expect(res.body.ownerResponse).to.exist;
        });
    });
  });
});