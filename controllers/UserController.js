const { body } = require('express-validator/check');
const { validationResult } = require('express-validator/check');
const User = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var getMessageError = (errors) => {
	var messageError = (!_.isArray(errors)) ? errors : errors;
	// var messageError = (!_.isArray(errors)) ? errors : errors.errors[0].param + ' ' + errors.errors[0].msg;
	return {message: messageError };
};

var sendError = (res, errors, statusCode) => {
	statusCode = statusCode | 500;
	return res.status(statusCode).json(getMessageError(errors));
}

// var getHashPassword = async (password) => {
// 	const salt = await bcrypt.genSalt(10);
// 	return await bcrypt.hash(password, salt);
// };

exports.getUserById = (userId) => {
	return User.findOne({_id: userId});
};

exports.register = async (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) return sendError(res, errors);

	const isEmailExist = await User.findOne({ email: req.body.email }); 
	if(isEmailExist) return sendError(res, 'Email already exist!');

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: User.getHashPassword(req.body.password)
	})

	try{
		const savedUser = await user.save();
		res.status(200).send(savedUser);
	}catch(error) {
		return sendError(res, error, 410);
	}
}

exports.login = async (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) return sendError(res, errors);

	const user = await User.findOne({ email: req.body.email });
	if(!user) return sendError(res, 'Email or password is wrong');

	const validatePassword = await bcrypt.compare(req.body.password, user.password);
	if(!validatePassword) return sendError(res, 'Invalid password');

	//create token
	const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
	res.header('authen-token', token).send(token);
}

exports.getBalance = (req, res, next) => {
	return res.send(req.user);
}