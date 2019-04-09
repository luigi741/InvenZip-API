//========================================================================
// server.js
// Main server side code for InvenZip
// By: Luis Castro
// =======================================================================

var express         = require('express');
var MongoClient     = require('mongodb').MongoClient;
var bodyParser      = require('body-parser');
var cors            = require('cors');
var app             = express();

app.use(
    cors({ origin: true }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);
require('./app/routes/routes')(app, {});
const port = 3000;

app.listen(port, function() {
    console.log('API is live on ' + port);
});
