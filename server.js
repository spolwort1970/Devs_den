var express = require ('express');

app = express();
port = 8080;

app.use(express.static('./public'));

app.get('*', function(req, res) {
  res.sendfile('./public/index.html')
});

app.listen(port, function() {
  console.log('Listeining on port' + port)
});
