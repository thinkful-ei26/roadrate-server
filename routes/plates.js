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
    // filter.$and = [
    //   { $or: [{'plateNumber': search.toUpperCase() }, {'plateState': state}] }
    // ];
    filter = {
      plateNumber: search.toUpperCase(), 
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
  let {state} = req.body;

  Plate.create({plateNumber, state, userId})
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
 
  Plate.findOneAndUpdate({ 'plateNumber': plateNumber } , { userId: userId })
    .then( plate => {
      console.log('plate on PUT', plate);
      return plate;
    })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;
