const User = require('../models/user');

exports.createUser = (req, res, next) => {
	const user = new User({ 
		username: req.body.username,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
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

exports.getUserById = (req, res, next) => {
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
};

exports.updateUser = (req, res, next) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
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