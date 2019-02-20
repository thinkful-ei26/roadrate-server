'use strict';

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();
const Plate = require('../models/plate');

// const jwtAuth = passport.authenticate('jwt', {
//   session: false,
//   failWithError: true
// });
// router.use(jwtAuth);

/* ========== GET ALL PLATES ========== */
router.get('/', (req, res, next) => {
  const { search, state } = req.query;
  let filter = {};

  if (search && state) {
    const re = new RegExp(search, 'i');
    // filter.$and = [
    //   { $or: [{'plateNumber': search.toUpperCase() }, {'plateState': state}] }
    // ];
    filter = {
      /*  plateNumber: search.toUpperCase(),  */
      plateNumber: re, 
      plateState: state
    };
  }

  Plate.find(filter)
    .exec()
    .then(docs => {
      console.log(docs);
      return res.status(200).json(docs);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET ALL PLATES USING userId from client ========== */
router.get('/all/:id', (req, res, next) => {
  let { id } = req.params;

  if(!id){
    const err = {
      message: 'Missing `userId` to fetch plates',
      reason: 'MissingContent',
      status: 400,
      location: 'get'
    };
    return next(err);
  }

  Plate.find({ userId: id })
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== GET ONE PLATE BY ID ========== */
router.get('/:id', (req, res, next) => {
  let {id} = req.params;
  Plate.findById(id)
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== FETCH KARMA SCORE ========== */
router.get('/:plateState/:plateNumber', (req, res, next) => {
  let plateState = req.params.plateState;
  let plateNumber = req.params.plateNumber;

  let filter = {};
 
  filter = {
    plateState,
    plateNumber
  };
  console.log('==== REQ.PARAMS PLATESTATE/PLATENUM ===',req.params);

  Plate.find(filter)
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== POST A PLATE ========== */
router.post('/', jsonParser, (req, res, next) => {
  let {plateNumber} = req.body;
  let {userId} = req.body;
  let {plateState} = req.body;

  Plate.create({plateNumber, plateState, userId})
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });

  // console.log('REQ.BODY ON POST PLATE', req.body);
  // res.json({
  //   message: 'returning something on post plate'
  // });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:userId', (req, res, next) => {
  const { userId } = req.params;
  const plateNumber = req.body.plateNumber;
  console.log('REQ.BODY from put: ',req.body);
  console.log(userId);
 
  if(!plateNumber){
    const err = {
      message: 'Missing `plateNumber` or `userId`',
      reason: 'MissingContent',
      status: 400,
      location: 'post'
    };
    return next(err);
  }

  Plate.findOneAndUpdate({ 'plateNumber': plateNumber } , { userId: userId })
    .then( plate => {
      console.log('plate on PUT', plate);
      return plate;
    })
    // .then(() => res.sendStatus(204))
    .then((data) => {
      console.log(data);
      res.status(204).json(data);
    })
    .catch(err => next(err));
});

module.exports = router;
