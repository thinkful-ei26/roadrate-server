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
    plateNumber: '123-YOLO', 
    carType: 'Truck', 
    userId: '000000000000000000000001',
    state: 'MA', 
    karma: 60
  },
  {
    _id: '000000000000000000000002',
    license: '456-YOLO', 
    carType: 'Van', 
    userId: '000000000000000000000002',
    state: 'PA', 
    karma: 10
  },
];

const reviews = [
  {
    plateId: '000000000000000000000001',
    reviewerId: '000000000000000000000001',
    plateNumber: '123-YOLO',
    state: 'MA',
    isPositive: true, 
    message: 'Pulled over and gave me her cell phone so I could call AAA after my phone battery died and had broken down.  Praise Hands',
    ownerResponse: 'No problem at all.  I couldnt just leave you there!'
  },
  {
    plateId: '000000000000000000000001',
    reviewerId: '000000000000000000000002',
    plateNumber: '123-YOLO',
    state: 'MA',
    isPositive: false, 
    message: 'Shifts between lanes like a mad woman',
    ownerResponse: 'I was running late for work!'
  },
  {
    plateId: '000000000000000000000001',
    reviewerId: '000000000000000000000001',
    plateNumber: '123-YOLO',
    state: 'MA',
    isPositive: true, 
    message: 'Good Driver!',
    ownerResponse: 'Thanks!'
  },
  {
    plateId: '000000000000000000000002',
    reviewerId: '000000000000000000000002',
    plateNumber: '456-YOLO',
    state: 'MA',
    isPositive: false, 
    message: 'Cut my off on i95 while driving like a lunatic!  Almost crashed into me and 3 other people',
    ownerResponse: 'My wife was having a baby in the backseat, and I needed to rush to the hospital.  Sorry about that!  It\'s a GIRL!! '
  },
  {
    plateId: '000000000000000000000002',
    reviewerId: '000000000000000000000001',
    plateNumber: '456-YOLO',
    state: 'PA',
    isPositive: true, 
    message: 'Helped me change my car tire!',
    ownerResponse: 'Nothing to see here'
  },
  {
    plateId: '000000000000000000000002',
    reviewerId: '000000000000000000000002',
    plateNumber: '456-YOLO',
    state: 'PA',
    isPositive: false, 
    message: 'Parked 5 feet from the curb and was affecting traffic getting downt the street.  7 thumbs down!!'
  }
];

module.exports = { users, plates, reviews };
