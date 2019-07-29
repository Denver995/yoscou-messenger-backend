const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
var urlencodedParser = bodyParser.json();

//enable all request from all domain to access our api
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //next();
});

mongoose.connect('mongodb://127.0.0.1:27017').then(() => {
	console.log('successfully connect to the cluster')
}).catch((err) => {
	console.log('was not able to connect');
	console.error(err);
});

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

module.exports = app;