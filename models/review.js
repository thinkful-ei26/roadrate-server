'use strict';

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  plateId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Plate'
  }, 
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  reviewerId: {
    type: String, 
  },
  licensePlate: {
    type: String,
    required: true
  },
  isPositive: {
    type: Boolean, 
    // required: true
  }, 
  message: {
    type: String,
    required: true
  },
  ownerResponse: {
    type: String,
  }
});

module.exports = mongoose.model('Review', ReviewSchema);