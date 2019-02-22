'use strict';

const mongoose = require('mongoose');

// car type validation for user claiming a plate

const PlateSchema = new mongoose.Schema({
  plateNumber: { 
    type : String, 
    required: true, 
    // unique: true 
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
  },
  numberOfReviews: {
    type: Number,
  }
});

PlateSchema.set('toJSON', {
  virtuals: true, 
  transform: (doc, result) => {
    delete result._id; //This is the reviewId
    delete result.__v;
  }
});

PlateSchema.methods.serialize = function() {
  return {
    plateNumber: this.plateNumber,
    plateState: this.plateState,
    karma: this.karma,
  };
};

module.exports = mongoose.model('Plate', PlateSchema);