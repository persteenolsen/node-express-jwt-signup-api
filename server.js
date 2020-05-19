require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

// Note: The port 8080 is also working on Azure with HTTPS enabled on Azure
var http = require('http');
var port = process.env.PORT || 443;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// Just a test for localhost:4000/test granted in jwt.js !
app.get('/test', function (req, res) {
    res.send('Hello World!');
   // console.log('Test');
 })

 
// api routes
app.use('/users', require('./users/user.login.controller'));
app.use('/users', require('./users/user.register.controller'));

app.use('/users', require('./users/user.get.controller'));
app.use('/users', require('./users/user.delete.controller'));
app.use('/users', require('./users/user.create.validate.controller'));
app.use('/users', require('./users/user.update.validate.controller'));

// global error handler
app.use(errorHandler);


app.listen(port, function(){
	console.log('Server running at port 443')
})
