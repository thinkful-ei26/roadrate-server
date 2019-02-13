'use strict';

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});
router.use(jwtAuth);

/* ========== GET ALL PLATES ========== */
router.get('/', (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => next(err));
});

/* ========== POST A PLATE ========== */
router.post('/plate', jwtAuth, (req, res) => {
  console.log('REQ.BODY ON POST PLATE', req.body);
  res.json({
    message: 'returning something on post plate'
  });
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
