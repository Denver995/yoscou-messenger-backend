const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: { type: String, require: true},
	description: { type: String, require: true},
	type: { type: String, require: true},
	id: { type: Number, require: true}
});

module.exports = mongoose.model('Product', productSchema)