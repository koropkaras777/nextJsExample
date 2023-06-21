const express = require('express');

const userController = require('../controllers/userController');
const router = new express.Router(); 

const verifyToken = require('../middleware/auth');


router.post('/signup', userController.signUp);

router.post('/users/login', userController.login);

router.post('/users/user', verifyToken, userController.getUser);

router.post('/users/logout', verifyToken, userController.logout);

router.delete('/users/delete', userController.deleteUser);


module.exports = router;