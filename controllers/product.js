const Product = require('../models/product');

exports.createProduct = (req, res, next) => {
	const product = new Product({
		name: req.productname,
		description: req.description,
		type: req.type,
		productId: req.productId,
	});

	product.save().then(() => {
		res.status(201).json({
			message: 'Your product have been added'
		});
		console.log(product);
	}).catch((error) => {
		res.status(400).send(error);
	});
};

exports.getAllProduct = (req, res) => {
	Product.find().then(
		(products) => {
			console.log(products);
			res.status(200).send(products);
	}).catch(
		(error) => {
			res.status(400).json({
				message: error
			});
		}
	);
};

exports.getProductById = (req, res, next) => {
	Product.findOne({_id: req.param.id}).then(
		(product) => {
			res.status(200).json(product);
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
};

exports.updateProduct = (req, res, next) => {
	const product = new Product({
		name: req.productname,
		description: req.description,
		type: req.type,
		productId: req.id,
	});

	Product.updateOne({_id: req.param.id}, product).then(
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

exports.deleteProduct = (req, res, next) => {
	Product.deleteOne({_id: req.param.id}).then(
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