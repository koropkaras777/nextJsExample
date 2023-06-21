const express = require('express');

const usersitesController = require('../controllers/usersitesController'); 
const router = new express.Router(); 

const verifyToken = require('../middleware/auth');


router.post('/user/addsite', verifyToken, usersitesController.addSite);

router.get('/user/getsites', verifyToken, usersitesController.getSites);

router.delete('/user/sitedelete', verifyToken, usersitesController.deleteSite);


module.exports = router;