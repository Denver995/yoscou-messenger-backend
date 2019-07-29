const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//enable all request from all domain to access our api
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use((req, res) => {
   res.json({ message: 'Your request was successful!' }); 
});

mongoose.connect('mongodb://127.0.0.1:27017').then(() => {
	console.log('successfully connect to the cluster')
}).catch((err) => {
	console.log('was not able to connect');
	console.error(err);
});

app.post('/api/user', (req, res) => {
	const user = new User({ 
		username: req.body.user_name,
		password: req.body.password,
		firstname: req.body.first_name,
		lastname: req.body.last_name,
		userId: req.body.userId,
		email: req.body.email,
	});

	user.save().then(() => {
		res.status(201).json({
			message: 'Your user have been added'
		});
		console.log(user);
	}).catch((error) => {
		res.status(400).json({
			error: error
		});
	});
});

//get all the users
app.get('/api/user', (req, res) => {
	User.find().then(
		(users) => {
			console.log(users);
			res.status(200).json(users);
	}).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
});

//get a single user
app.get('/api/user/:id', (req, res) => {
	User.findOne({_id: req.param.id}).then(
		(user) => {
			res.status(200).json(user);
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
});

//update a user
app.put('/api/user/:id', (req, res, next) => {
	const user = new User({
		username: req.body.user_name,
		password: req.body.password,
		firstname: req.body.first_name,
		lastname: req.body.last_name,
		userId: req.body.userId,
		email: req.body.email,
	});

	User.updateOne({_id: req.param.id}, user).then(
		() => {
			res.status(201).json({
				message: 'update'
			})
	}).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
});

//delete a user
app.delete('/api/user/:id', (req, res) => {
	User.deleteOne({_id: req.param.id}).then(
		(user) => {
			res.status(200).json({
				message: 'delete'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
});

module.exports = app;