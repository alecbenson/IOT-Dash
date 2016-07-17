'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
	extended: false
}));
router.use(bodyParser.json());

//Respond with date and time properties
router.get('/', function (req, res) {
	var d = new Date();
	var dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var values = {
		hours: d.getHours(),
		minutes: d.getMinutes(),
		seconds: d.getSeconds(),
		day: d.getUTCDate(),
		month: d.getUTCMonth() + 1,
		year: d.getUTCFullYear(),
		weekDay: dayMap[d.getDay()]
	}
	res.json(values);
});

module.exports = router;
