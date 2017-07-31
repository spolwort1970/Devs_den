var mongoose = require ('mongoose');
var Schema = mongoose.Schema;


// Subject to change
var Employers = new Schema({

  firstname: String,
  lastname: String,
  email: String,
  company: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipcode
  },
  password: String


})
