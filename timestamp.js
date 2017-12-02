var express = require('express');
var app = express();
var fs = require('fs');
var sugar = require('sugar');
var converter = require('/app/converter.js');








app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });

app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/response.html');
    })
app.route('/:query')
  .get(function(req, res) {
  res.send(converter(req.params.query));
  res.end();
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});