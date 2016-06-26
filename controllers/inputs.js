var express = require('express');
var router = express.Router();
var winston = require('winston');
var bodyParser = require('body-parser');

//Get body-parser data
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Input page
router.get('/', function(req, res) {
  res.render('inputs', {title: 'Input Sources'});
});

module.exports = router;
