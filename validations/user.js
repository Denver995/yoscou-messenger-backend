const Joi = require('@hapi/joi');

exports.singupValidation = (data) => {
	const schema = {
		username: Joi.string().min(6).required(),
		password: Joi.string().min(6).required(),
		firstname: Joi.string().min(6),
		lastname: Joi.string().min(6),
		email: Joi.string().required().min(6).email(),
	}
	return Joi.validate(data, schema);
};

exports.singinValidation = (data) => {

	const schema = {
		username: Joi.string().min(6).required(),
		password: Joi.string().min(6).required(),
	}
	return Joi.validate(data, schema);
};