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
    app.get('/getUsers', function(req, res){
        db.collection('userData').find({}).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
            res.send(JSON.stringify(result));
        });
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

    app.get('/getListNames/:user', function(req, res) {
        console.log('GET request made to /getListNames');
        var docs = [];
        var user = req.params.user? req.params.user : "luiscastro";
        db.collection('scanData').find({user})
        .toArray(function(err, result) {
            if (err) {
                return res.status(500).send(err)
            }
            docs = result;
            return res.status(200).send(docs)
        });
    });

    app.post('/updateListNames', function(req, res, next) {
        console.log('POST request made to /updateListNames');
        db.collection('scanData').updateOne({id: req.body._id}, {$set: {name: req.body.name, location: req.body.location} }, function(err, res) {
            if (err) throw err;
            return res
        });
        res.status(200).send({message: "Updated"})
    });

    app.post('/updateItems/:id', function(req, res, next) {
        console.log('POST request made to /updateItems');
        db.collection('scanData').updateOne({id: req.params._id}, {$set: {items: req.body} }, function(err, res) {
            if (err) throw err;
            console.log("updated")
            return res
        });
        res.status(200).send({message: "Updated"})
    });
    
    app.post('/editSubmit', function(req, res){
       let updateInfo = req.body;
       console.log(updateInfo);
       console.log(updateInfo[0].name);
       db.collection("userData").updateOne({"name":updateInfo[0].name, "email":updateInfo[0].email}, 
       {$set: {"name":updateInfo[1].name, "email":updateInfo[1].email}});
       res.send('Post succeded');

    });
});
