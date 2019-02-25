'use strict';

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  plateId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Plate'
  }, 
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  plateNumber: {
    type: String,
    required: true,
  },
  isPositive: {
    type: String, 
    // required: true
  }, 
  message: {
    type: String,
    // required: true
  },
  ownerResponse: {
    type: String,
  },
  plateState: {
    type: String,
    // required: true
  }
});

ReviewSchema.set('timestamps', true);

ReviewSchema.set('toJSON', {
  virtuals: true, 
  transform: (doc, result) => {
    delete result.reviewerId;
    delete result.__v;
  }
});

ReviewSchema.methods.serialize = function() {
  return {
    plateId: this.plateId,
    message: this.message,
    plateNumber: this.plateNumber,
    plateState: this.plateState
  };
};

module.exports = mongoose.model('Review', ReviewSchema);