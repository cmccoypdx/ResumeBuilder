var express = require('express');
var rbs = express();
var path = require('path');

rbs.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/form.html'));
});

rbs.listen(8080);
