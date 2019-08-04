const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//import Route
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();

dotenv.config();

//MiddleWare
app.use(express.json());

//enable all request from all domain to access our api
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }).then((db) => {
	console.log('successfully connect to the cluster', db);
}).catch((err) => {
	console.log('was not able to connect');
	console.error(err);
});

//Route MiddleWare
app.use('/api/auth', userRoutes);
app.use('/api/product', productRoutes);

module.exports = app;