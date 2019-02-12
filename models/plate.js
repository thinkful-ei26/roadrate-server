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
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: 0,
  },
  state: { // US state (like MA)
    type: String, 
    required: true
  },
  karma: {
    type: Number
  }
});

module.exports = mongoose.model('Plate', PlateSchema);