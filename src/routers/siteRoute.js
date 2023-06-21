const express = require('express');

const siteController = require('../controllers/siteController'); 
const router = new express.Router(); 


router.post('/sites/addsite', siteController.addSite);

router.get('/sites/getsites', siteController.getSites);

router.delete('/sites/deletesite', siteController.deleteSite);


module.exports = router;