const { body } = require('express-validator');

const validationRegister = [
	body('name').isLength({ min: 6, max: 255 }),
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 255 })
];

const validationLogin = [
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 255 })
];


module.exports.validationRegister = validationRegister;
module.exports.validationLogin = validationLogin;