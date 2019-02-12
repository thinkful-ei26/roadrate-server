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

UserSchema.set('toJSON', {
  virtuals: true, 
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password; //delete plaintext password so it doesn't come back in the response
  }
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username,
    name: this.name || '',
    id: this._id,
  };
};

module.exports = mongoose.model('User', UserSchema);