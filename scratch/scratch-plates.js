// beforeEach(() =>  {
//   return Promise.all([
//     User.insertMany(users),
//     Plate.insertMany(plates),
//   ])
//     .then(results => {
//       console.log('results from testing',results);
//     })
//     .then(results => {
//       const userResults = results[0];
//       user = userResults[0];
//       token =  jwt.sign( { user }, JWT_SECRET, {
//         subject: user.username,
//         expiresIn: JWT_EXPIRY
//       });
//     });
// );


//     // return User.hashPassword(password).then(password =>
//     //   User.create({
//     //     username,
//     //     password,
//     //     name
//     //   })
//     // );
//   });

  // afterEach( () => {
  //   return Promise.all([
  //     User.deleteMany(),
  //     Plate.deleteMany()
  //   ]); 
  // });

  // //after ALL tests, drobdb & disconnect server
  // after( () => {
  //   return dbDisconnect();
  // });
 
// describe('GET /api/notes', () => {
//   it('should return the correct number of Notes', () => {
//     return Promise.all([
//       Note.find({ userId: user.id }),
//       chai.request(app)
//         .get('/api/notes')
//         .set('Authorization', `Bearer ${token}`)
//     ])
//       .then(([data, res]) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(data.length);
//       });
//   });
// }


//   }/* END OF ALL PLATES TEST*/
// );