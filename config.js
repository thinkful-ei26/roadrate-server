'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://jordan:haddadi@roadrate-shard-00-00-qquzy.mongodb.net:27017,roadrate-shard-00-01-qquzy.mongodb.net:27017,roadrate-shard-00-02-qquzy.mongodb.net:27017/test?ssl=true&replicaSet=RoadRate-shard-0&authSource=admin&retryWrites=true',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://localhost/thinkful-backend-test',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d' 
  // DATABASE_URL:
  //     process.env.DATABASE_URL || 'postgres://localhost/thinkful-backend',
  // TEST_DATABASE_URL:
  //     process.env.TEST_DATABASE_URL ||
  //     'postgres://localhost/thinkful-backend-test'
};