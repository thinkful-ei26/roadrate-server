'use strict';

const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const Plate = require('../models/plate');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();

/* ========== GET ALL REVIEWS ========== */
router.get('/', (req, res, next) => {
  const { number } = req.query;
  const { state } = req.query;
  let filter = {};
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

  Review.find(filter)
    .sort({'createdAt': -1})
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

  Review.find({ plateId })
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== GET FILTERED REVIEWS BY PLATEID (for public plate)  ========== */
router.get('/plate/:plateId', (req, res, next) => {
  let plateId = req.params.plateId;
 
  Review.find({ plateId })
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
// this is the same code above but uses the userId to fetch reviews & filter 
router.get('/:userId', (req, res, next) => {

  let userId = req.params.userId;

  User.find({id: userId})
    .then(() => {  
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
  
  const newReview = {
    plateNumber: plateNumber.toUpperCase(),
    reviewerId,
    message,
    isPositive,
    plateState,
  };

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
  
  Review.findOneAndUpdate({_id: id}, {ownerResponse: ownerResponse}, {new: true})
    .then(review => res.json(review))
    .catch(err => next(err));
});

module.exports = router;
