'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport'); 

const { error404, error500 } = require('./error-middleware');
const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

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
app.use('/api', authRouter);
app.use('/api', platesRouter);

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
  dbConnect();
  runServer();
}

module.exports = { app };