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
  res.send(req.body.firstName + ' ' + req.body.lastName);
});

rbs.listen(8080);
