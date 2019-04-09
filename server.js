//==============================================================================
// server.js
// Main server side code for InvenZip
// By: Luis Castro
// =============================================================================

var express         = require('express');
var MongoClient     = require('mongodb').MongoClient;
var bodyParser      = require('body-parser');
var cors            = require('cors');
var db              = require('./config/db');
var app             = express();

const port = 3000;
const dbURL = 'mongodb://admin:password@54.198.236.52:27017/testdb';
require('./app/routes/routes')(app, {});

app.use(
    cors({ origin: true }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

MongoClient.connect(dbURL, function(err, client) {
    if (err) {
        return console.log(err);
    }
    // const database = database.db('testdb');
    // require ('./routes')(app, database);

    db.collection('scanData').insert(testObject, function(err, result) {
        if (err) {
            res.send( {'error': 'An error has occured' });
        }
        else {
            res.send(result.ops[0]);
        }
    });

    app.listen(port, function() {
        console.log('API is live on ' + port);
    });
});
