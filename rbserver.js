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
  res.write('<html lang="en"><head><meta http-equiv="Content-Type" context="text/html" charset="UTF-8" />');
  res.write('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=" />');
  res.write('<title>' + req.body.firstName + ' ' + req.body.lastName + ' - Resume</title>');
  res.write('</head>');
  res.write('<body class="bg-light">');
  res.write('<div class="jumbotron bg-info">');
  res.write('<div class="container">');
  res.write('<h1 class="display-3 text-white">' + req.body.firstName + ' ' + req.body.lastName + '</h1>');
  res.write('<h4 class="display-5 text-white">' + req.body.summary + '</p>');
  res.write('</div></div>');
  res.write('<div class="container">');
  res.write('<div class="shadow-sm my-3 p-3 bg-white rounded">');
  res.write('<h2 class="display-5">Experience</h2>');
  for (var i = 0; i < parseInt(req.body.numJobs); i++)
  {
    res.write('<h4 class="display-5 text-info">' + req.body['employer' + i] + '</h4>');
    res.write('<p class="display-5 text-muted">' + req.body['title' + i] + '</p>');
    res.write('<p>' + req.body['jobdesc' + i] + '</p>'); 
  }
  res.write('</div>');
  res.write('<div class="shadow-sm my-3 p-3 bg-white rounded">');
  res.write('<h2 class="display-5">Education</h2>');
  for (var i = 0; i < parseInt(req.body.numSchools); i++)
  {
    res.write('<h4 class="display-5 text-info">' + req.body['school' + i] +'</h4>');
    res.write('<p class="display-5 text-muted">' + req.body['degree' + i] + '</p>');
    res.write('<p>' + req.body['desc' + i] + '</p>');
  }
  res.write('</div>');
  res.write('<div class="shadow-sm my-3 p-3 bg-white rounded">');
  res.write('<h2 class="display-5">Skills</h2>');
  var skills = req.body.skills.split(',');
  res.write('<p><ul>');
  for (var s of skills) {
    res.write('<li>' + s.trim() + '</li>');
  }
  res.write('</ul></p>');
  res.write('</div>');
  res.write('<div class="shadow-sm my-3 p-3 bg-white rounded">');
  res.write('<h2 class="display-5">References</h2>');
  for (var i = 0; i < parseInt(req.body.numRefs); i++)
  {
    res.write('<h4 class="display-5 text-info">' + req.body['first' + i] + ' ' + req.body['last' + i] + '</h4>');
    res.write('<p class="display-5 text-muted">' + req.body['about' + i] + '</p>');
    res.write('<p>' + req.body['phone' + i] + '<br>' + req.body['email' + i] +'</p>');
  }
  res.write('</div>');
  for (var i = 0; i < parseInt(req.body.numMisc); i++)
  {
    if (req.body['category' + i] != '') 
    {
      res.write('<div class="shadow-sm my-3 p-3 bg-white rounded">');
      res.write('<h2 class="display-5">' + req.body['category' + i] + '</h2>');
      res.write('<p>' + req.body['detail' + i] + '</p>');
      res.write('</div>');
    }
  }
  res.write('<div class="shadow-sm my-3 p-3 bg-white rounded">');
  res.write('<h2 class="display-5">Contact</h2>');
  res.write('<p><span class="text-info">Phone: </span>' + req.body.phone + 
    '<br><span class="text-info">Email: </span>' + req.body.email +
    '<br><span class="text-info">Address:</span><br>' + req.body.address + 
    '<br>');
  if (req.body.address2 != '')
  {
    res.write(req.body.address2 + '<br>');
  }
  res.write(req.body.city + ', ' + req.body.state + '<br>' + req.body.zip + 
    '<br>' + req.body.country + '</p>');
  res.write('</div>');
  res.write('</div>');
  res.write('<script><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.0/css/bootstrap.min.css"/><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.0/js/bootstrap.min.js"></script>');
  res.write('</body>');
  res.end()
});

rbs.listen(8080);
