const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: { type: String, require: true},
	password: { type: String, require: true},
	firstname: { type: String, require: true},
	lastname: { type: String, require: true},
	email: { type: String, require: true},
	userId:  { type: Number, require: true},
}); 

module.exports = mongoose.model('User', userSchema);