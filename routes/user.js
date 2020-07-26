const router = require('express').Router();
const userController = require('../controllers/UserController');
const verify = require('./verifyToken');


router.get('/balance', verify, userController.getBalance);


module.exports = router;