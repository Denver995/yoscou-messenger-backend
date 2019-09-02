const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidation = require('../validations/user');

exports.singup = (req, res) => {
	//handle validation for user registration
	const {error} = userValidation.singupValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//check for the email existance in db
	User.findOne({email: req.body.email}).then((user) => {
		if(user) return res.status(400).send("email already exist");
	}).catch(error => {
		res.send(`unknow error happend ${error}`);
	});

	bcrypt.hash('revdencl', 10).then(
		(hash) => {
			//create a new user object to be persist
			const user = new User({ 
				username: req.body.username,
				password: hash,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
			});

			user.save().then(
				() => {
					return res.status(201).json({
						message: 'Your user have been added',
						user: user
					});
					//console.log(user);
				}).catch((error) => {
					res.status(400).json({
						error: error
					}
				);
			});
		}
	);
	console.log("sign up user");
	//res.send("sing up user");
};

exports.login = (req, res, next) => {
	//handle validation for user registration
	const {error} = userValidation.loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	User.findOne({email: req.body.email}).then(
		(user) => {
			if (!user) return res.status(401).send("not found");
			bcrypt.compare(req.body.password, user.password).then(
				(valid) => {
					if (!valid) return res.status(401).send('invalid password');
					const token = jwt.sign(
						{userId: user._id},
						process.env.TOKEN_SECRET
					);
				    res.header('auth-token', token).send(token);
				}
			).catch(
				(error) => {
					console.log("error token");		
					return res.status(500).send(error);
	
				}
			);		
		}
	).catch(
		(error) => {
			console.log("error email");
			return res.status(500).send(error);
		}
	);
};

exports.getAllUser = (req, res, next) => {
	User.find().then(
		(users) => {
			console.log(users);
			res.status(200).send(users);
	}).catch(
		(error) => {
			res.status(400).send(error);
		}
	);
};

exports.updateUser = (req, res, next) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
	});

	User.updateOne({_id: req.param.id}, user).then(
		() => {
			res.status(201).send('update')
	}).catch(
		(error) => {
			res.status(400).send(error);
 		}
	);
};

exports.deleteUser = (req, res, next) => {
	User.deleteOne({_id: req.param.id}).then(
		() => {
			res.status(200).json({
				message: 'delete'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				message: error
			});
		}
	);
};