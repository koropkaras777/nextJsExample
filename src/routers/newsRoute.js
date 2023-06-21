const express = require('express');

const newsController = require('../controllers/newsController');
const router = new express.Router();

const verifyToken = require('../middleware/auth'); 


router.get('/user/getnewsbysite', verifyToken, newsController.getNews);


module.exports = router;