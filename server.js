var express = require ('express');
var path = require ('path');
var bodyParser = require ('body-parser');

var index = require ('./routes/index');
var users = require ('./routes/users');
var employers = require ('./routes/employers');

app = express();
port = 8080;


// Set static folder, angular client side
app.use(express.static(path.join(__dirname, 'public')));

// Body Parse MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Sets home page, route will render user dashboard/ home page
app.use('/', index);

// Api routes
app.use('/api', users);
app.use('/api', employers);

app.listen(port, function() {
  console.log('Listeining on port' + port)
});
