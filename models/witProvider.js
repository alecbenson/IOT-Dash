'use strict';

var config = require('../config');
var {
	Wit,
	log
} = require('node-wit');

var WitProvider = function () {
	this._init();
	this.logger = new log.Logger(log.DEBUG);
};

WitProvider.prototype._init = function() {
	const actions = {
		send(request, response) {
			return new Promise(function(resolve) {
				console.log('sending...', JSON.stringify(response));
				return resolve();
			});
		},
		getForecast({context}) {
			return new Promise(function(resolve) {
				resolve(context);
			});
		},
		playMusic({context}) {
			return new Promise(function(resolve) {
				console.log('music being played');
				resolve(context);
			});
		}
	};

	this.client = new Wit({
		accessToken: config.witAi.accessToken,
		actions: actions
	});
}

WitProvider.prototype.sendMessage = function (message, context) {
	return this.client.message(message, context).then(function (data) {
		var response = 'WIT RESPONSE:' + JSON.stringify(data);
		console.log(response);
	});
}

WitProvider.prototype.runActions = function (message, context) {
	return this.client.runActions(1, message, context).then(function (newContext) {
		var response = 'WIT RESPONSE:' + JSON.stringify(newContext);
		console.log(response);
	});
}

module.exports = WitProvider;
