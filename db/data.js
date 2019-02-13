'use strict';

const users = [
  {
    _id: '000000000000000000000001',
    name: 'John Snow',
    username: 'john',
    // hash for "password123"
    password: '$2a$10$Wz21bpsMCBBRdRztr2.ZYOw9sJGkFgcowKZCMtvaqdBuhvofmZHRe'
  },
  {
    _id: '000000000000000000000002',
    name: 'Tyrion Lannister',
    username: 'tyrion',
    // hash for "password123"
    password: '$2a$10$Wz21bpsMCBBRdRztr2.ZYOw9sJGkFgcowKZCMtvaqdBuhvofmZHRe'
  }
];

const plates = [
  {
    _id: '0001',
    license: '123YOLO', 
    carType: 'Truck', 
    userId: '000000000000000000000001',
    state: 'MA', 
    karma: 60
  },
  {
    _id: '0002',
    license: '456YOLO', 
    carType: 'Van', 
    userId: '000000000000000000000002',
    state: 'MI', 
    karma: 10
  },
];

const reviews = [
  {
    plateId: '0001',
    userId: '000000000000000000000001',
    isPositive: true, 
    message: 'Good Driver!',
    ownerResponse: 'Nothing to see here'
  },
  {
    plateId: '0002',
    userId: '000000000000000000000002',
    isPositive: false, 
    message: 'Needs Improvement',
    ownerResponse: 'Nothing to see here'
  }
];

module.exports = { users, plates, reviews };
