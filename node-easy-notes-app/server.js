var express = require ('express');
var bodyParser = require ('body-parser');

var app =express (); // to create the express app

app.use(bodyParser.urlencoded({ extended: true }));//parse requests of content-type -application/x-www-form-urlencoded

app.use (bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

console.log(dbConfig.url);
mongoose.connect (dbConfig.url)


.then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
	console.log("Could not connect to the database.Exiting now....");
	process.exit();
});

//define a simple route
app.get ("/", (req, res) => {
	res.json({"message" : "Welcome to EasyNotes application. Take notes quickly.Organise and keep track of all your notes."});
});

//Require notes routes
require('./app/routes/note.routes.js')(app);

//listen for requests
app.listen(3000, () => {
	console.log("server is listening on port 3000");
});