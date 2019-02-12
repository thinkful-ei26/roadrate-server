'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name : { 
    type : String, 
    default: '',
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
  plateId: { 
    /* 
    1. POST req to create plate 
    2. PUT on user if user didn't register with a plate on initial registration 
    */
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Plate'
  },
  myReviews: { // reviews that the user made
    type: Array
  } 
});

UserSchema.set('toJSON', {
  virtuals: true, 
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password; //delete plaintext password so it doesn't come back in the response
  }
});

//development:
UserSchema.methods.serialize = function() {
  return {
    username: this.username,
    name: this.name || '',
    id: this._id,
  };
};

module.exports = mongoose.model('User', UserSchema);