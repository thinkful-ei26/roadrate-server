'use strict';

const mongoose = require('mongoose');

const PlateSchema = new mongoose.Schema({
  name : { 
    type : String, 
    default: '',
    required: true, 
  },
  username : { 
    type : String, 
    required: true, 
    unique: true 
  },
  password : { 
    type : String, 
    required : true 
  },
  plate: {}, 
});

module.exports = mongoose.model('Plate', PlateSchema);