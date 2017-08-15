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

app = express();

// Cors MW
app.use(cors());

// Port Number
port = process.env.PORT || 3000;

// Body Parse MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Passport MW
app.use(passport.initialize());
app.use(passport.session());

// require('./config/passport')(passport);

// Set static folder, angular client side
app.use(express.static(path.join(__dirname, 'public')));

var users = require ('./routes/users');


app.use('/users', users);


app.listen(port, function() {
  console.log('Listening on port' + port)
});
