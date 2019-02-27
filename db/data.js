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
  },
  // {
  //   _id: '000000000000000000000006',
  //   plateNumber: 'HBPRINCE', 
  //   carType: 'Truck', 
  //   userId: '000000000000000000000002',
  //   plateState: 'WY', 
  //   karma: -1
  // }
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
    updatedAt:'2019-02-25T20:56:03.233+00:00',
    ownerResponse:'Thanks!'
  },
  // {
  //   plateId: '000000000000000000000001',
  //   reviewerId: '000000000000000000000002',
  //   plateNumber: '123-YOLO',
  //   plateState: 'MA',
  //   isPositive: false, 
  //   message: 'Shifts between lanes like a mad woman',
  //   ownerResponse: 'I was running late for work!'
  // },
  // {
  //   plateId: '000000000000000000000001',
  //   reviewerId: '000000000000000000000001',
  //   plateNumber: '123-YOLO',
  //   plateState: 'MA',
  //   isPositive: true, 
  //   message: 'Good Driver!',
  //   ownerResponse: 'Thanks!'
  // },
  // {
  //   plateId: '000000000000000000000002',
  //   reviewerId: '000000000000000000000002',
  //   plateNumber: '456-YOLO',
  //   plateState: 'MA',
  //   isPositive: false, 
  //   message: 'Cut my off on i95 while driving like a lunatic!  Almost crashed into me and 3 other people',
  //   ownerResponse: 'My wife was having a baby in the backseat, and I needed to rush to the hospital.  Sorry about that!  It\'s a GIRL!! '
  // },
  // {
  //   plateId: '000000000000000000000002',
  //   reviewerId: '000000000000000000000001',
  //   plateNumber: '456-YOLO',
  //   plateState: 'PA',
  //   isPositive: true, 
  //   message: 'Helped me change my car tire!',
  //   ownerResponse: 'Nothing to see here'
  // },
  // {
  //   plateId: '000000000000000000000002',
  //   reviewerId: '000000000000000000000002',
  //   plateNumber: '456-YOLO',
  //   plateState: 'PA',
  //   isPositive: false, 
  //   message: 'Parked 5 feet from the curb and was affecting traffic getting downt the street.  7 thumbs down!!'
  // }
];

module.exports = { users, plates, reviews };