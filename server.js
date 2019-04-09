//==============================================================================
// server.js
// Main server side code for InvenZip
// By: Luis Castro
// =============================================================================

var express         = require('express');
var MongoClient     = require('mongodb').MongoClient;
var bodyParser      = require('body-parser');
var cors            = require('cors');
var db              = require('./app/config/db');
var app             = express();

const port = 3000;
require('./app/routes/routes')(app, {});

app.use(
    cors({ origin: true }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

MongoClient.connect(db.url, function(err, database) {
    if (err) {
        return console.log(err);
    }
    const database = database.db('testdb');
    require ('./app/routes')(app, database);

    app.listen(port, function() {
        console.log('API is live on ' + port);
    });
});
