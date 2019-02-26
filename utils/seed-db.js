'use strict';

const mongoose = require('mongoose');
const { TEST_DATABASE_URL } = require('../config');

const User = require('../models/user');
const Plate = require('../models/plate');
const Review = require('../models/review');
const { users, plates, reviews } = require('../db/data');

console.log(`Connecting to mongodb at ${TEST_DATABASE_URL}`);
mongoose.connect(TEST_DATABASE_URL, { useNewUrlParser:true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => { 
    console.info('Delete Data');
    return Promise.all([
      User.deleteMany(),
      Plate.deleteMany(),
      Review.deleteMany()
    ]);
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([
      User.insertMany(users),
      Plate.insertMany(plates),
      Review.insertMany(reviews)
    ]);
  })
  .then(results => {
    console.info(`Inserted ${results.length} Users`);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });