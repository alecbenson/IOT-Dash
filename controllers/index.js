//This is the base controller which is responsible for loading all other controllers
var express = require('express');
var router = express.Router();
var winston = require('winston');

//home page
router.get('/', function(req, res) {
  res.render('overview', {title: 'Overview'});
});

//Partial view API
router.use('/partials', require('./partials'));

//Device API
router.use('/devices', require('./devices'));

//Trigger API
router.use('/triggers', require('./triggers'));

module.exports = router;
