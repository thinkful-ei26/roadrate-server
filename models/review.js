'use strict';

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  plateId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Plate'
  }, 
  isPositive: {
    type: Boolean, 
    required: true
  }, 
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Review', ReviewSchema);