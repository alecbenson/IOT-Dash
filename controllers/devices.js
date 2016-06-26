var express = require('express');
var router = express.Router();
var winston = require('winston');
var Device = require('../models/device');
var bodyParser = require('body-parser');

//Get body-parser data
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Devices page
router.get('/', function(req, res) {
  res.render('devices', {title: 'Devices'});
});

//Find all
router.get('/all', function(req, res) {
  var query = Device.find();
  query.exec(function (err, devices) {
    if (err) {
      winston.log('error', 'Get devices: ' + err);
      res.sendStatus(500);
    }
    res.json(devices);
  });
});

//Find by ID
router.get('/single/:id', function(req, res) {
  var id = req.params.id;
  if (!id) {
    res.sendStatus(400); //You suck at requesting
  }
  //Query for a device with the given id
  var query = Device.findOne({'_id': id});
  query.exec(function (err, device) {
    if (err) {
      winston.log('error', 'Get device: ' + err);
      res.sendStatus(404); //Not found
    }
    //Send the device back
    res.json(device);
  });
});

//Delete by ID
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  if (!id) {
    res.sendStatus(400); //You suck at requesting
  }
  //Query for a device with the given id
  var query = Device.findOne({'_id': id});
  query.remove().exec(function (err, device) {
    if (err) {
      winston.log('error', 'Remove device: ' + err);
      res.sendStatus(404); //Not found
    }
    res.sendStatus(204); //Deleted succesfully
  });
});

//Insert a new device
router.post('/', function (req, res) {
  winston.log('info', req.body);
  var device = new Device();
  device.name = req.body.name;
  device.description = req.body.description;
  device.ip = req.body.ip;
  device.triggers = req.body.triggers;

  //Save the device to the DB
  device.save(function (err) {
    if (err) {
      winston.log('error', 'Post new device: ' + err);
      res.send(err);
      return;
    }
    winston.log('info', 'Post new device: ' + 'success!');
    res.send({status: 201, response: 'Created'});
  });
});

module.exports = router;
