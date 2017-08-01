const express = require ('express');
const path = require ('path');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const cors = require ('cors');
const mongoose = require ('mongoose');

var index = require ('./routes/index');
var devs = require ('./routes/devs');
var employers = require ('./routes/employers');

app = express();
// Cors MW
app.use(cors());

// Port Number
port = 3000;

// Body Parse MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Set static folder, angular client side
app.use(express.static(path.join(__dirname, 'public')));


// Sets home page, route will render user dashboard/ home page
app.use('/', index);

// Api routes
app.use('/devs', devs);
app.use('/employers', employers);

app.listen(port, function() {
  console.log('Listeining on port' + port)
});
