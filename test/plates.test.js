'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

//schemas
const Plate = require('../models/plate');
const User = require('../models/user');

//Auth requirements
// const jwt = require('jsonwebtoken');
const { TEST_DATABASE_URL } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');

const { app } = require('../index');

//db
const { plates, users } = require('../db/data');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

//declare chai.expect as variable to use it for tests
const expect = chai.expect;

//mount chai http so you can use it
chai.use(chaiHttp); 

describe('RoadRate API - Plates', () => {

  //set token and user at high scope to be accessible for rest of test
  let token;
  let user;
  
  //test hooks: 
  //connect to db, blow away the existing db
  before(() => {
    return dbConnect(TEST_DATABASE_URL)
      .then(() => Plate.deleteMany());
  });

  //insert some notes before test & create the indexes too

  beforeEach( () => {
    return Promise.all([
      User.insertMany(users),
      User.createIndexes(),
      Plate.insertMany(plates)
    ])
      .then(results => {
        console.log('results from testing',results);
      });
  });

  afterEach( () => {
    return Promise.all([
      User.deleteMany(),
      Plate.deleteMany()
    ]); 
  });

  //after ALL tests, drobdb & disconnect server
  after( () => {
    return dbDisconnect();
  });


  describe('GET /api/plates', () => {
    it('should return the correct number of Plates', () => {
      return Promise.all([
        Plate.find(),
        chai.request(app)
          .get('/api/plates')
      ])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);
        });
    }); /*end of it */



  }); // end of GET /api/plates
  



});//end of ROADRATE PLATES

