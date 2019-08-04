'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  // DATABASE_URL: process.env.DATABASE_URL || 'mongodb+srv://jordan:haddadi@roadrate-qquzy.mongodb.net/roadrate?retryWrites=true&w=majority', // development 
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb+srv://jordan:haddadi@roadrate-qquzy.mongodb.net/test?retryWrites=true&w=majority', //production
  JWT_SECRET: process.env.JWT_SECRET || 'random-secret-key',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d' 
};