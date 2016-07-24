'use strict';

var mongoose = require('mongoose');
var winston = require('winston');

//Make a new connection
var connect = function (db) {
	if (!mongoose.connection.readyState) {
		mongoose.connect(db, function (err) {
			if (err) {
				winston.log('error', 'Mongo connect: ' + err);
				throw err;
			}
			winston.log('info', 'Connected to mongo at ' + db);
		});
	}
};

exports.connectProd = function () {
	connect('mongodb://localhost/iotdash');
}

exports.connectTest = function () {
	connect('mongodb://localhost/iotdash-test');
}

exports.drop = function () {
	mongoose.connection.db.dropDatabase();
}

//Use bluebird promises
mongoose.Promise = require('bluebird');

//Exit the connection
exports.close = function () {
	mongoose.connection.close();
	winston.log('info', 'Disconnected from mongo');
};
