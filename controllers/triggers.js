var express = require('express');
var router = express.Router();
var winston = require('winston');
var Trigger = require('../models/trigger');
var bodyParser = require('body-parser');

//Get body-parser data
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Trigger page
router.get('/', function(req, res) {
  res.render('triggers', {title: 'Triggers'});
});

//Find all
router.get('/all', function(req, res) {
  var query = Trigger.find();
  query.exec(function (err, triggers) {
    if (err) {
      winston.log('error', 'Get triggers: ' + err);
      res.sendStatus(500);
    }
    res.json(triggers);
  });
});

//Find by ID
router.get('/single/:id', function(req, res) {
  var id = req.params.id;
  if (!id) {
    res.sendStatus(400); //You suck at requesting
  }
  //Query for a trigger with the given id
  var query = Trigger.findOne({'_id': id});
  query.exec(function (err, trigger) {
    if (err) {
      winston.log('error', 'Get trigger: ' + err);
      res.sendStatus(404); //Not found
    }
    //Send the trigger back
    res.json(trigger);
  });
});

//Delete by ID
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  if (!id) {
    res.sendStatus(400); //You suck at requesting
  }
  //Query for a trigger with the given id
  var query = Trigger.findOne({'_id': id});
  query.remove().exec(function (err, trigger) {
    if (err) {
      winston.log('error', 'Remove trigger: ' + err);
      res.sendStatus(404); //Not found
    }
    res.sendStatus(204); //Deleted succesfully
  });
});

//Insert a new trigger
router.post('/', function (req, res) {
  winston.log('info', req.body);
  var trigger = new Trigger();
  trigger.name = req.body.name;
  trigger.description = req.body.description;

  //Save the trigger to the DB
  trigger.save(function (err) {
    if (err) {
      winston.log('error', 'Post new trigger: ' + err);
      res.send(err);
      return;
    }
    winston.log('info', 'Post new trigger: ' + 'success!');
    res.send({status: 201, response: 'Created'});
  });
});

module.exports = router;
