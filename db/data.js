'use strict';

const users = [
  {
    _id: '000000000000000000000001',
    name: 'John Snow',
    username: 'john',
    // hash for "password123"
    password: '$2a$10$Wz21bpsMCBBRdRztr2.ZYOw9sJGkFgcowKZCMtvaqdBuhvofmZHRe',
    email: 'thenightswatch123@gmail.com'
  },
  {
    _id: '000000000000000000000002',
    name: 'Tyrion Lannister',
    username: 'tyrion',
    // hash for "password123"
    password: '$2a$10$Wz21bpsMCBBRdRztr2.ZYOw9sJGkFgcowKZCMtvaqdBuhvofmZHRe',
    email: 'HalfManHalfAmazing@gmail.com'
  }
];

const plates = [
  {
    _id: '000000000000000000000001',
    plateNumber: '123YOLO', 
    carType: 'Truck', 
    userId: '000000000000000000000001',
    state: 'MA', 
    karma: 60
  },
  {
    _id: '000000000000000000000002',
    plateNumber: '456YOLO', 
    carType: 'Van', 
    userId: '000000000000000000000002',
    state: 'MI', 
    karma: 10
  },
];

const reviews = [
  {
    plateId: '000000000000000000000001',
    userId: '000000000000000000000001',
    plateNumber: '456YOLO',
    isPositive: true, 
    message: 'Good Driver!',
    state: 'MI', 
    ownerResponse: 'Nothing to see here'
  },
  {
    plateId: '000000000000000000000001',
    userId: '000000000000000000000002',
    plateNumber: '123YOLO',
    isPositive: false, 
    message: 'Needs Improvement',
    state: 'MI', 
    ownerResponse: 'Nothing to see here'
  },
  {
    plateId: '000000000000000000000001',
    userId: '000000000000000000000001',
    plateNumber: '456YOLO',
    isPositive: true, 
    message: 'Good Driver!',
    state: 'MI', 
    ownerResponse: 'Nothing to see here'
  },
  {
    plateId: '000000000000000000000002',
    userId: '000000000000000000000002',
    plateNumber: '123YOLO',
    isPositive: false, 
    message: 'Needs Improvement',
    state: 'MI', 
    ownerResponse: 'Nothing to see here'
  },
  {
    plateId: '000000000000000000000002',
    userId: '000000000000000000000001',
    plateNumber: '123YOLO',
    isPositive: true, 
    message: 'Helped me change my car tire!',
    state: 'MI', 
    ownerResponse: 'Nothing to see here'
  },
  {
    plateId: '000000000000000000000002',
    userId: '000000000000000000000002',
    plateNumber: '456YOLO',
    isPositive: false, 
    message: 'Parked 5 feet from the curb and was affecting traffic getting downt the street.  7 thumbs down!!',
    state: 'MI', 
    ownerResponse: 'Nothing to see here'
  }
];

module.exports = { users, plates, reviews };
