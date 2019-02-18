'use strict';

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const Review = require('../models/review');
const Plate = require('../models/plate');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();

// const jwtAuth = passport.authenticate('jwt', {
//   session: false,
//   failWithError: true
// });
// router.use(jwtAuth);

//GET ALL REVIEWS
router.get('/', (req, res, next) => {
  const { search } = req.query;
  let filter = {};

  console.log('REQ.QUERY HERE',req.query);

  if (search) {
    // const re = new RegExp(search, 'i');
    filter.$or = [
      {'plateNumber': search.toUpperCase() },
      // {'message': re},  
      // {'isPositive': re}, 
    ];
  }

  Review.find(filter)
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

router.post('/', jsonParser, (req, res, next) => {
  let user = req.body.username;
  let plateNumber = req.body.plateNumber;
  let reviewerId = req.body.reviewerId;
  let isPositive = req.body.rating;
  let message = req.body.message;
  let plateState = req.body.plateState;

  console.log('PlateState', plateState);
  
  const newReview = {
    plateNumber: plateNumber.toUpperCase(),
    reviewerId,
    message,
    isPositive,
    plateState,
  };

  console.log('NEW REVIEW: ', newReview);

  Plate.findOne({plateNumber, plateState})
    .then(plate => {
      if (!plate) {
        let karma;

        if (isPositive === true) {
          karma = 1;
        } else {
          karma = - 1;
        }
        
        Plate.create({plateNumber, plateState, karma})
          .then((plate) => {
            // console.log('new plate object', plate);
            newReview.plateId = plate._id;
            Review.create(newReview)
              .then(data => {
                res.status(201).json(data);
              })
              .catch(err => {
                next(err);
              });
          });
      } else {
        newReview.plateId = plate._id;
        Review.create(newReview)
          .then(data => {
            if (data.isPositive === 'true') {
              console.log('updating karma score', 'id:' , newReview.plateId);
              // Plate.findByIdAndUpdate(newReview.plateId, {$inc: { karma: 1}});
              Plate.findById(newReview.plateId)
                .then(plate => plate.updateOne({$inc: {karma: 1}}));
            } else {
              Plate.findById(newReview.plateId)
                .then(plate => plate.updateOne({$inc: {karma: - 1}}));
            }  
            res.status(201).json(data);
          })
          .catch(err => {
            next(err);
          });
      }
    });
});

module.exports = router;
