'use strict';

var mongoose = require('mongoose');
var winston = require('winston');

var host = 'mongodb://localhost/iotdash';

//Make a new connection
exports.connect = function () {
	if (!mongoose.connection.readyState) {
		mongoose.connect(host, function (err) {
			if (err) {
				winston.log('error', 'Mongo connect: ' + err);
				throw err;
			}
			winston.log('info', 'Connected to mongo at ' + host);
		});
	}
};

//Use bluebird promises
mongoose.Promise = require('bluebird');

//Exit the connection
exports.close = function () {
	mongoose.connection.close();
	winston.log('info', 'Disconnected from mongo');
};
