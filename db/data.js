'use strict';

const users = [
  {
    _id : '000000000000000000000001',
    name: 'Severus Snape',
    username : 'severus',
    email : 'em@em.com',
    password: '$2a$10$gHgeUHAzkHWJqSe2i7W04e3B0/kV1mENSII0wuLU/IUL1cX4N9SKq',
    createdAt: '2019-02-26T16:10:40.003+00:00',
    updatedAt: '2019-02-26T16:10:40.003+00:00'
  },
  {
    _id: '000000000000000000000002',
    name: 'John Snow',
    username: 'john',
    password: '$2a$10$RO.gat3xGh28m.tmSHX9JOVUKJjpbb6t1gdRNhdDPBXxewlcypW7O',
    email: 'thenightswatch123@gmail.com',
    createdAt: '2019-02-23T11:14:02.127+00:00',
    updatedAt: '2019-02-23T11:14:02.127+00:00'
  }
];

const plates = [
  {
    _id: '000000000000000000000001',
    plateNumber: 'SNOW', 
    carType: 'Truck', 
    userId: '000000000000000000000001',
    plateState: 'AK', 
    karma: 2
  },
  {
    _id: '000000000000000000000002',
    plateNumber: 'SNOWY', 
    carType: 'Truck', 
    plateState: 'AK', 
    karma: 2
  },
  {
    _id: '000000000000000000000003',
    plateNumber: 'HBPRINCE', 
    carType: 'Truck', 
    userId: '000000000000000000000002',
    plateState: 'WY', 
    karma: -1
  }
];

const reviews = [
  {
    _id:'000000000000000000000001',
    plateNumber:'HBPRINCE',
    reviewerId: '000000000000000000000001',
    message:'Really nice guy who got me a Starbucks gift card after I helped him change his tires.',
    isPositive:'true',
    plateState:'WY',
    plateId:'000000000000000000000003',
    createdAt:'2019-02-22T23:16:30.598+00:00',
    updatedAt:'2019-02-23T11:52:32.650+00:00',
    ownerResponse:'Thanks!'
  },
  {
    _id:'000000000000000000000002',
    plateNumber:'SNOW',
    reviewerId: '000000000000000000000002',
    message:'Responsible driver',
    isPositive:'true',
    plateState:'AK',
    plateId:'000000000000000000000001',
    createdAt:'2019-02-23T11:15:52.266+00:00',
    updatedAt:'2019-02-25T20:56:03.233+00:00'
  }
];

module.exports = { users, plates, reviews };