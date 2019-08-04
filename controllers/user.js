const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.singup = (req, res) => {
	bcrypt.hash('revdencl', 10).then(
		(hash) => {
			const user = new User({ 
				username: req.username,
				password: hash,
				firstname: req.firstname,
				lastname: req.lastname,
				email: req.email,
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
	User.findOne({email: req.param.email}).then(
		(user) => {
			if (!user) {
				res.status(401).json({
					error: new Error('not found!')
				});
			}
			bcrypt.compare(req.password, user.password).then(
				(valid) => {
					if (!valid) {
						res.status(401).json({
							error: new Error('invalid password')
						});
					}
					const token = jwt.sign(
						{userId: user._id},
						'RANDOM_TOKEN_SECRET',
						{expireIn: '24h'}
					);
					res.status(200).json({
						userId: user._id,
						token: token
					});
				}
			).catch(
				(error) => {
					res.status(500).json({
						error: error
					});
				}
			);		
		}
	).catch(
		(error) => {
			res.status(500).json({
				error: error
			});
		}
	);
};

exports.getAllUser = (req, res, next) => {
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
};

exports.updateUser = (req, res, next) => {
	const user = new User({
		username: req.username,
		password: req.password,
		firstname: req.firstname,
		lastname: req.lastname,
		email: req.email,
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
				error: error
			});
		}
	);
};