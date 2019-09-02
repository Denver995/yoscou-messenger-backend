const Post = require('../models/blogPost');

exports.createPost = (req, res, next) => {
	const blogpost = new Post({
		author: req.body.author,
		body: req.body.body,
		type: req.body.type,
		title: req.body.title,
	});

	blogpost.save().then(() => {
		res.status(201).json({
			message: 'Your post have been added'
		});
		console.log(blogpost);
	}).catch((error) => {
		res.status(400).send(error);
	});
};

exports.getAllPost = (req, res) => {
	Post.find().then(
		(blogposts) => {
			console.log(blogposts);
			res.status(200).send(blogposts);
	}).catch(
		(error) => {
			res.status(400).json({
				message: error
			});
		}
	);
};

exports.getPostByAuthor = (req, res, next) => {
	Post.findOne({_author: req.param.author}).then(
		(blogpost) => {
			res.status(200).json(blogpost);
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
};

exports.getPostByType = (req, res, next) => {
	Post.findOne({_type: req.param.type}).then(
		(blogpost) => {
			res.status(200).json(blogpost);
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
};

exports.updatePost = (req, res, next) => {
	const blogpost = new Post({
		author: req.body.author,
		body: req.body.body,
		type: req.body.type,
		title: req.body.title,
	});

	Post.updateOne({_author: req.param.author}, blogpost).then(
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

exports.deletePost = (req, res, next) => {
	Post.deleteOne({_id: req.param.id}).then(
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