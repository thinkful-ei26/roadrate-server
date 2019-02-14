'use strict';

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const Review = require('../models/review');
const router = express.Router();

// const jwtAuth = passport.authenticate('jwt', {
//   session: false,
//   failWithError: true
// });
// router.use(jwtAuth);

//GET ALL REVIEWS
router.get('/', (req, res, next) => {
  Review.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/', (req, res, next) => {
  let user = req.body.username;
  let id;
  console.log(user);

  User.findOne({username: user})
    .then(res => {
      id = res.id;
      console.log(id);
    });

  const review = new Review({
    licensePlate: req.body.licensePlate,
    userId: id,
    isPositive: req.body.rating,
    message: req.body.message
  });

  review.save().then(result => {
    console.log(result);
  })
    .catch(err => console.log(err));
  res.status(201).json({
    message: 'Handled POST request',
    createdReview: review
  });
  
});


module.exports = router;
