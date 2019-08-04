const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: { 
		type: String, 
		require: true, 
		min: 6, 
		unique: true
	},

	password: { 
		type: String, 
		require: true
	},

	firstname: { 
		type: String, 
		require: false
	},

	lastname: { 
		type: String, 
		require: false
	},

	email: { 
		type: String, 
		require: true, 
		max: 255, 
		unique: true
	},
	
	date: { 
		type: Date, 
		default: Date.now
	}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema); 