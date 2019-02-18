'use strict';

const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const router = express.Router();
const Plate = require('../models/plate');

const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});
router.use(jwtAuth);

/* ========== GET ALL PLATES ========== */
router.get('/plate', (req, res, next) => {
  // User.findById(req.user.id)
  //   .then(user => {
  //     res.json(user);
  //   })
  //   .catch(err => next(err));

  Plate.find()
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.get('/plate/:id', (req, res, next) => {
  let {id} = req.params;
  Plate.findById(id)
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== POST A PLATE ========== */
router.post('/plate', jwtAuth, jsonParser, (req, res, next) => {
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
router.put('/plate/:userid', (req, res, next) => {
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
