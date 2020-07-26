const jwt = require('jsonwebtoken');
const userController = require('../controllers/UserController');

module.exports = async (req, res, next) => {
	const token = req.header('auth-token');

	if(!token) return res.status(401).send('Access denied');

	try{
		const verify = jwt.verify(token, process.env.TOKEN_SECRET);
		var isUser = await userController.getUserById(verify);
		if(!isUser) return res.status(400).send('humm... invalid token');
		req.user = isUser;
		next();
	}catch(error){
		res.status(400).send('Invalid token');
	}
}