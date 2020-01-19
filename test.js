var express = require('express');
var app = express();



//Serves all the request which includes /images in the url from Images folder
app.use( express.static(__dirname + '/assets'));

var server = app.listen(5000);