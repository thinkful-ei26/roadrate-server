'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport'); 
const mongoose = require('mongoose');

const { error404, error500 } = require('./error-middleware');
const { PORT, CLIENT_ORIGIN, MONGODB_URI } = require('./config');

// Security
const localStrategy = require('./passport/local');
passport.use(localStrategy);
const jwtStrategy = require('./passport/jwt');
passport.use(jwtStrategy);

// Create an Express application
const app = express();

//Routers
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const platesRouter = require('./routes/plates');
const reviewsRouter = require('./routes/reviews');

// logs all requests
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

//allow cross origin communication b/w front-end & backend
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());

// Mount routers
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/plates', platesRouter);
app.use('/api', authRouter);

// Error handlers
app.use(error404);
app.use(error500);

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  mongoose.connect(MONGODB_URI, { useNewUrlParser:true }) //Mongo will automatically create the db here if it doesnt exist, and then mongoose will automatically create any collections that dont already exist by going through your models
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error('\n === Did you remember to start `mongod`? === \n');
    console.error(err);
  });
  runServer();
}

module.exports = { app };