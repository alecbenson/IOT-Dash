//This is the base controller which is responsible for loading all other controllers
var express = require('express');
var router = express.Router();
var winston = require('winston');

//Trigger page
router.get('/', function(req, res) {
  res.render('triggers', {title: 'Triggers'});
});

module.exports = router;
