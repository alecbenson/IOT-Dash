'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//Get body-parser data
router.use(bodyParser.urlencoded({
	extended: false
}));
router.use(bodyParser.json());

//Input page
router.get('/', function (req, res) {
	res.render('voice', {
		title: 'Voice Control'
	});
});

module.exports = router;
