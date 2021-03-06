'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

//schemas
const Plate = require('../models/plate');
const User = require('../models/user');

//Auth requirements
const jwt = require('jsonwebtoken');
const { TEST_DATABASE_URL, JWT_SECRET, JWT_EXPIRY } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');
const { app } = require('../index');
const { plates, users } = require('../db/data');

process.env.NODE_ENV = 'test';
process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp); 

describe('RoadRate API - Plates', () => {
  let token;
  let user;
  
  before(() => {
    return dbConnect(TEST_DATABASE_URL);
  });

  beforeEach( () => {
    return Promise.all([
      Plate.deleteMany(),
      User.deleteMany()
    ])
      .then(() => {
        return Promise.all([
          User.insertMany(users),
          User.createIndexes(),
          Plate.insertMany(plates)
        ])
          .then(results => {
            const userResults = results[0];
            user = userResults[0];
            token =  jwt.sign( { user }, JWT_SECRET, {
              subject: user.username,
              expiresIn: JWT_EXPIRY
            });
          });
      });
  });

  afterEach( () => {
    return Promise.all([
      User.deleteMany(),
      Plate.deleteMany()
    ]); 
  });
  
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
        });
    });

    it('should return correct search results for a plateNumber search', () => {
      const search = 'SNOW';
      const state = 'AK';
      const re = new RegExp(search, 'i');
      const dbPromise = Plate
        .find({
          plateNumber: re,
          plateState: state
        });
      const apiPromise = chai.request(app)
        .get(`/api/plates/?search=${search}&state=${state}`);
      return Promise.all([dbPromise, apiPromise])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          res.body.forEach( (item, i) => {
            expect(item).to.be.a('object');
            expect(item).to.include.all.keys('carType', 'plateNumber', 'plateState', 'karma', 'id'); 
            expect(item.id).to.equal(data[i].id);
            expect(item.plateNumber).to.equal(data[i].plateNumber);
            expect(item.plateState).to.equal(data[i].plateState);
            expect(item.carType).to.equal(data[i].carType);
            expect(item.karma).to.equal(data[i].karma);
          });
        });
    });

    it('should return an empty array for an incorrect query', () => {
      const search = 'NOT-A-VALID-QUERY';
      const state = 'NOT-A-VALID-QUERY';
      const re = new RegExp(search, 'i');
      const dbPromise = Plate
        .find({
          plateNumber: re,
          plateState: state
        });
      const apiPromise = chai.request(app)
        .get(`/api/plates/?search=${search}&state=${state}`);
      return Promise.all([dbPromise, apiPromise])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);
        });
    });
  }); 

  describe('GET /api/plates/all/:id', () => {
    it('should return correct plate using the userId', () => {
      let data;
      const userId = user.id;
      return Plate.find({ userId })
        .then(_data => {
          data = _data;
          return chai.request(app)
            .get(`/api/plates/all/${userId}`);
        })
        .then((res) => { //note karma is optional a plate can be claimed without a karma score
          const [ body ] = res.body;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(body).to.include.all.keys('id', 'carType', 'plateNumber', 'plateState');
          expect(res.body.id).to.equal(data.id);
          expect(res.body.carType).to.equal(data.carType);
          expect(res.body.plateNumber).to.equal(data.plateNumber);
          expect(res.body.plateState).to.equal(data.plateState);
        });
    }); //end of it()
 
    it('should respond with status 400 and an error message when `id` is not valid', () => {
      return chai.request(app)
        .get('/api/plates/all/NOT-A-VALID-ID')
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Missing `userId` to fetch plates');
        });
    });
  });

  describe('GET /api/plates/:id', () => {
    it('should return correct plate using the plateId', () => {
      let data;
      const _id = user.id;

      return Plate.findById({ _id })
        .then(_data => {
          data = _data;
          return chai.request(app)
            .get(`/api/plates/${_id}`);
        })
        .then((res) => { 
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.all.keys('id', 'carType', 'plateNumber', 'plateState'); 
          expect(res.body.id).to.equal(data.id);
          expect(res.body.carType).to.equal(data.carType);
          expect(res.body.plateNumber).to.equal(data.plateNumber);
          expect(res.body.plateState).to.equal(data.plateState);
        });
    });
 
    it('should respond with status 400 and an error message when `id` is not valid', () => {
      return chai.request(app)
        .get('/api/plates/all/NOT-A-VALID-ID')
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Missing `userId` to fetch plates');
        });
    });
  });

  describe('GET /api/plates/:id', () => {
    it('should return correct plate using the plateState and plateNumber', () => {
      let plateState = 'AK';
      let plateNumber = 'SNOW';
      let filter = {};

      filter = {
        plateState,
        plateNumber
      };

      return Plate.find(filter)
        .then(data => {
          return chai.request(app)
            .get(`/api/plates/${plateState}/${plateNumber}`);
        })
        .then((res) => { 
          const body = res.body;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(body).to.be.an('array');
        });
    });
 
    it('should respond with status 400 and an error message when `id` is not valid', () => {
      return chai.request(app)
        .get('/api/plates/all/NOT-A-VALID-ID')
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Missing `userId` to fetch plates');
        });
    });
  }); 

  describe('POST /api/plates', () => {

    it('should create and return a new plate when provided valid plateNumber, plateState, and userId', () => {
      const newItem = {
        plateNumber: '123YOLO',
        plateState: 'MA',
        userId: '5c712afa1ee8106edae019d5'
      };
      let res;
      return chai.request(app)
        .post('/api/plates')
        .set('Authorization', `Bearer ${token}`)
        .send(newItem)
        .then((_res) => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.all.keys('plateNumber', 'plateState', 'carType', 'id', 'isOwned');
          return Plate.findById(res.body.id);
        })
        .then(data => {
          expect(res.body.id).to.equal(data.id);
          expect(res.body.plateNumber).to.equal(data.plateNumber);
          expect(res.body.plateState).to.equal(data.plateState);
          expect(res.body.carType).to.equal(data.carType);
          expect(newItem.userId).to.equal(data.userId.toString());
        });
    });

    it('should return an error when missing "plateNumber" or "plateState" field', () => {
      const newItem = {};
      return chai.request(app)
        .post('/api/plates')
        .set('Authorization', `Bearer ${token}`)
        .send(newItem)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Missing `plateNumber` or `plateState` in request body');
        });
    });
  }); 

  describe('PUT /api/plates/:userId', () => {

    it('claim a license plate by appending a userId to the plate document if given the plateNumber, plateState, and a userId', () => {
      const userId = '5c712afa1ee8106edae019d5';
      const plateNumber = 'SNOWY';
      const plateState = 'AK';
      
      const updateItem = {
        plateNumber, plateState, userId
      };
      let data;

      return  Plate.findOneAndUpdate({ plateNumber, plateState } , { userId: userId })
        .then(_data => {
          data = _data;
          return chai.request(app)
            .put(`/api/plates/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateItem);
        })
        .then( res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'plateNumber', 'plateState', 'karma');
          expect(res.body.id).to.equal(data.id);
          expect(res.body.title).to.equal(updateItem.title);
          expect(res.body.content).to.equal(data.content);
          expect(res.body.folderId).to.equal(data.folderId);
        });
    });
  });

  describe('PUT /api/plates/unclaim/:userId', () => {
    it('unclaim plate unsets userId from plate document', () => {
      const userId = '5c712afa1ee8106edae019d5';
      const plateNumber = 'SNOWY';
      const plateState = 'AK';
      const updateItem = {
        plateNumber, plateState, userId
      };
      let data;

      return  Plate.findOneAndUpdate({ 'plateNumber': plateNumber } , { $unset: { userId: userId }})
        .then(_data => {
          data = _data;
          return chai.request(app)
            .put(`/api/plates/unclaim/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateItem);
        })
        .then( res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'plateNumber', 'plateState', 'karma');
          expect(res.body.id).to.equal(data.id);
          expect(res.body.title).to.equal(updateItem.title);
          expect(res.body.content).to.equal(data.content);
          expect(res.body.folderId).to.equal(data.folderId);
        });
    });
  });
});

