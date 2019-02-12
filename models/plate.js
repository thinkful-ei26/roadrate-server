'use strict';

const mongoose = require('mongoose');

// car type validation for user claiming a plate

const PlateSchema = new mongoose.Schema({
  license : { 
    type : String, 
    required: true, 
    unique: true 
  },
  carType: {
    type: String,
    default: ''
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'User'
  // },
  state: { // US state (like MA)
    type: String, 
    required: true
  }, 
  plateReviews: { // array of review ids
    type: Array,
    // plateId: {},
    // isPositive: {}, 
    // message: {},
    // userResponse: {}
  }, 
  karma: {
    type: Number
  }
});

module.exports = mongoose.model('Plate', PlateSchema);