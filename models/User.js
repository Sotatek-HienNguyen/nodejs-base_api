const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, "can't be blank"],
		lowercase: true,
		match: [/^[a-zA-Z0-9]+$/, "is invalid"],
		min: 6,
		max: 255,
		index: true
	},
	email: {
		type: String,
		require: true,
		lowercase: true,
		match: [/\S+@\S+\.\S+/, "is valid"],
		min: 6,
		max: 255,
		index: true
	},
	password: {
		type: String,
		require: true,
		min: 6,
		max: 255
	},
	date: {
		type: Date,
		default: Date.now
	}
}, { timestamps: true });


userSchema.getHashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

module.exports = mongoose.model('User', userSchema);