const mongoose = require('mongoose');

const blogPostSchema =  new mongoose.Schema({
	author: {
		type: String,
		require: true,
		min: 6,
	},

	type: {
		type: String,
		require: false
	},

	title: {
		type: String,
		require: true
	},

	body: {
		type: String,
		require: true
	},

	publicationDate: {
		type: Date,
		default: Date.now
	},

	editedDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('BlogPost', blogPostSchema);