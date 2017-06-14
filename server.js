'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const tmp = require('tmp');
const mv = require('mv');

const PORT = process.env.PORT || 3000;

var tempDir = tmp.dirSync(); // Create a new temp directory
// Setup multer. Upload files to a temp directory, limit to 10 MB
var upload = multer({
  dest: tempDir.name,
  limits: {
    fileSize: 10*1024*104
  }
});

//open db connection
// const db = mongoose.connection;

//catch any database errors
// db.on("error", (error) => {console.log("Database error: ", error);})
// Once logged in to the db through mongoose, log a success message
// db.once("open", () => {console.log("Mongoose connection successful.");});
app.use(express.static("public"));


// Sets up the Express app middleware to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var uploading = multer({
  dest: __dirname + '/public/uploads/'
});
app.get('/', (req, res) => {
  res.send("Hello world");
})
app.post('/upload', uploading.single('image'), function(req, res) {
  console.log(req.file);
  res.send(req.file);
})

// const routes = require('./routes');
// for (let route in routes) {
//   app.use(route, routes[route]);
// }

app.listen(PORT, function() {
  console.log("Listening on port:%s", PORT);
});
