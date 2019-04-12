//==============================================================================
// server.js
// Server side NodeJS code for our custom API
// By: Luis Castro
//==============================================================================

const MongoClient   = require('mongodb').MongoClient;
const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const assert        = require('assert');
const app           = express();
const PORT          = 3000;
const dbURL         = 'mongodb://admin:password@54.198.236.52:27017/testdb';
const dbName        = 'testdb';

app.use(
    cors({ origin: true }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

app.listen(PORT, function() {
    console.log('NodeJS server running on port: ' + PORT);
});

MongoClient.connect(dbURL, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to MongoDB server.');
    const db = client.db(dbName);

    app.get('/', function(req, res) {
        res.send('Hello from /');
    });

    app.post('/test', function(req,res) {
        console.log('/test');
        res.send('Reached /test route');
    });

    app.post('/upcScan', function(req, res) {
        console.log(req.body);
        var testObj = req.body;
        db.collection('scanData').insertOne(testObj, function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Data inserted successfully.');
            }
        });
        res.send('Hello from /upcScan');
    });
});
