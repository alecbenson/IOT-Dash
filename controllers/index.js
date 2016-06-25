//This is the base controller which is responsible for loading all other controllers
var express = require('express');
var router = express.Router();

//Initialize home page
router.get('/', function(req, res) {
  res.render('index', {title: 'Device Control Panel', message: 'Hello!' });
});

module.exports = router;
