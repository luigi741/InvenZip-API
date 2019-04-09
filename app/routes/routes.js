//==============================================================================
// routes.js
// This holds the different routes for the Invenzip app
// and all of the CRUD operations
// By: Luis Castro
//==============================================================================

var express     = require('express');
var bodyParser  = require('body-parser');
var db          = require('./app/config/db');
var app         = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CRUD function/routes
module.exports = function(app, db) {
    app.post('/test', function(req, res) {
        res.send('Hello, response from /test route!');
        console.log(req.body);

        var testObject = {
            name: 'lima',
            location: 'charlie'
        };

        db.collection('scanData').insert(testObject, function(err, result) {
            if (err) {
                res.send( {'error': 'An error has occured' });
            }
            else {
                res.send(result.ops[0]);
            }
        });
    });
    app.post('/upcScan', function(req, res) {
        res.send('Camera scanning function request received.');
        console.log('Request received:');
        console.log(req.body);
    });
};
