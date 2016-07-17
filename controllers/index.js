'use strict';

//This is the base controller which is responsible for loading all other controllers
var express = require('express');
var router = express.Router();

//Partial view API
router.use('/partials', require('./partials'));

//Device API
router.use('/devices', require('./devices'));

//Trigger API
router.use('/triggers', require('./triggers'));

//Input API
router.use('/inputs', require('./inputs'));

//DateTime API
router.use('/datetime', require('./dateTime'));

//home page
router.get('/', function (req, res) {
	res.redirect('/devices');
});

module.exports = router;
