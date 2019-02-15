'use strict';

const mongoose = require('mongoose');

// car type validation for user claiming a plate

const PlateSchema = new mongoose.Schema({
  plateNumber: { 
    type : String, 
    required: true, 
    unique: true 
  },
  carType: {
    type: String,
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  plateState: { // US state (like MA)
    type: String, 
    // required: true
  },
  karma: {
    type: Number,
    default: 0
  },
  numberOfReviews: {
    type: Number,
  }
});

module.exports = mongoose.model('Plate', PlateSchema);