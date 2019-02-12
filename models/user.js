'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  plate: {
    type: String,
    default: '',
    // type: mongoose.Schema.Types.ObjectId, 
    // ref: 'User'
  },
  myReviews: {
    type: Array
  } 
});

module.exports = mongoose.model('User', UserSchema);