const express = require ('express');
const path = require ('path');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const cors = require ('cors');
const mongoose = require ('mongoose');
const config = require ('./config/database');

mongoose.connect(config.database, {
  useMongoClient: true
});

mongoose.connection.on('connected', function () {
  console.log('Connected to database');
});

// mongoose.connection.on('error', function () {
//   console.log('database error: ' + err);
// });



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

// Passport MW
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Set static folder, angular client side
app.use(express.static(path.join(__dirname, 'public')));

app.use('/devs', devs);
app.use('/employers', employers);

// Index Route
app.get('/', (req, res) => {
  res.send("Invalid Endpoint");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function() {
  console.log('Listening on port' + port)
});
