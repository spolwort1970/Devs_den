var mongoose = require ('mongoose');
var Schema = mongoose.Schema;


// Subject to change
var Users = new Schema({

  username: String,
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  adress: {
    street: String,
    city: String,
    state: String,
    zipcode: String
  },
  github: String,
  password: String

})
