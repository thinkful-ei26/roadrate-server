'use strict';

const express = require('express');
// const passport = require('passport');
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

/* ========== GET ALL REVIEWS ========== */
router.get('/', (req, res, next) => {
  const { number } = req.query;
  const { state } = req.query;
  let filter = {};

  console.log('REQ.QUERY HERE',req.query);

  const re = new RegExp(number, 'i');

  if (number && !state) {
    filter = {
      plateNumber: re,
    };
  } else if (!number && state) {
    filter = {
      plateState: state,
    };
  } else if (number && state) {
    filter = {
      plateState: state,
      plateNumber: re,
    };
  }
  
  console.log('filtering for:', filter);

  Review.find(filter)
    .sort({'updatedAt': -1})
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

/* ========== GET REVIEWS BY PLATEID ========== */
router.get('/my-plates/:plateId', (req, res, next) => {
  let plateId = req.params.plateId;

  Review.find({plateId})
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== GET FILTERED REVIEWS BY PLATEID (for public plate)  ========== */
router.get('/plate/:plateId', (req, res, next) => {
  let plateId = req.params.plateId;
 
  Review.find({plateId})
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== GET FILTERED REVIEWS FOR PLATES ========== */
router.get('/:plateState/:plateNumber', (req, res, next) => {
  let plateState = req.params.plateState;
  let plateNumber = req.params.plateNumber;
  let filter = {};
 
  filter = {
    plateState,
    plateNumber
  };

  Review.find(filter)
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== GET FILTERED REVIEWS LEFT BY SPECIFIC USER ========== */
router.get('/:user', (req, res, next) => {

  let username = req.params.user;
  console.log(username);

  User.find({username: username})
    .then(user => {
      const userId = user[0]._id;   
      return Review.find({reviewerId: userId})
        .then(reviews => res.json(reviews))
        .catch(err => next(err));
    })
    .catch( err => next(err));

});
    
/* ========== GET ONE REVIEW BY ID ========== */
router.get('/:id', (req, res, next) => {
  let { id }  = req.params;

  if(!id || id === '' ) {
    const err = {
      message: 'Missing review `id`',
      reason: 'MissingContent',
      status: 400,
      location: 'get'
    };
    return next(err);
  }

  Review.findById(id)
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== POST/CREATE A REVIEW ========== */
router.post('/', jsonParser, (req, res, next) => {
  // let user = req.body.username;
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

        if (isPositive === 'true') {
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

router.put('/:id', jsonParser, (req, res, next) => {
  const {id} = req.params;
  const {ownerResponse} = req.body;

  console.log('id', id);
  console.log('response', ownerResponse);
  
  Review.findOneAndUpdate({_id: id}, {ownerResponse: ownerResponse}, {new: true})
    .then(review => res.json(review))
    .catch(err => next(err));
});

module.exports = router;
