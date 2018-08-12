'use strict';

var express = require('express');
var rbs = express();
var path = require('path');
var parser = require('body-parser');
var urlencodedParser = parser.urlencoded({ extended: false });

rbs.get('/', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname + '/form.html'));
});

rbs.post('/interactive', urlencodedParser, (req, res) => {
  res.write('<header class="header bg-info">');
  res.write('<div class="jumbotron bg-info">');
  res.write('<h1 class="display-3 text-white">' + req.body.firstName + ' ' + req.body.lastName + '</h1>');
  res.write('<script><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.0/css/bootstrap.min.css"/><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.0/js/bootstrap.min.js"></script>');
  res.write('</header>');
  res.write(req.body.email);
  res.end()
});

rbs.listen(8080);
