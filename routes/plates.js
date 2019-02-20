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

  console.log('REQ.QUERY HERE',req.query);

  if (search && state) {
    const re = new RegExp(search, 'i');
    filter.$or = [
      {'plateNumber': search.toUpperCase() },
      {'plateState': state},
      {'message': re},  
      {'isPositive': re} 
      // {'plateId': }
    ];
  }

  Plate.find(filter)
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  let {id} = req.params;
  Plate.findById(id)
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.get('/:plateState/:plateNumber', (req, res, next) => {
  let state = req.params.plateState;
  let plate = req.params.plateNumber;

  let filter = {};

  filter = {
    plateState: state,
    plateNumber: plate.toLowerCase(),
  };

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
router.put('/:userid', (req, res, next) => {
  const { userid } = req.params;
  console.log('REQ.BODY from put: ',req.body);
 
  User.findById(userid)
    .then( user => {
      console.log('user on PUT', user);
      return User.findByIdAndUpdate(
        userid,
        { 
          plateid: 'STATIC PLATE ID'
        },
        { new: true }
      ); 
    })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;
