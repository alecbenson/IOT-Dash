//This is the base controller which is responsible for loading all other controllers
var express = require('express');
var router = express.Router();
var winston = require('winston');

//home page
router.get('/', function(req, res) {
  res.render('overview', {title: 'Overview'});
});
//Device management page
router.get('/manage', function(req, res) {
  res.render('manage', {title: 'Management'});
});

//Device API
router.use('/devices', require('./devices'));

//Partial view API
router.use('/partials', require('./partials'));

module.exports = router;
