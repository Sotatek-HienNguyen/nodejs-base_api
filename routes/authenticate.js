const router = require('express').Router();
const userController = require('../controllers/UserController');
const { validationRegister, validationLogin } = require('../validation');

router.post('/register', validationRegister, userController.register);

router.post('/login', validationLogin, userController.login);


module.exports = router;