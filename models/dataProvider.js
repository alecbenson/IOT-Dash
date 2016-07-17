'use strict';

var request = require('request');
var Promise = require('bluebird');
var winston = require('winston');

var DataProvider = function (input) {
	if (!input) {
		winston.log('error', 'No input object provided to data provider');
		return;
	}
	this.input = input;
};

DataProvider.prototype.doAction = function () {
	return this.request(this.input.requestType, this.input.url, this.input.params, 2000);
}

//Helper function to generate query params based on a passed in object
function _objToQueryParams(params) {
	var parts = [];
	params.forEach(function (keyVal) {
		var p = encodeURIComponent(keyVal.key) + '=' + encodeURIComponent(keyVal.value);
		parts.push(p);
	});
	return '?' + parts.join('&');
}

//Issue a request with the given params object and the specified timeout period
DataProvider.prototype.request = function (type, url, params, timeout) {
	var fullUrl = params.length ? url + _objToQueryParams(params) : url;
	//Issue request
	return new Promise(function (resolve, reject) {
		request({
			uri: fullUrl,
			method: type,
			timeout: (timeout || 2000)
		}, function (err, response, body) {
			if (!err) {
				resolve(body);
			} else {
				reject(new Error(type + ' REQUEST: ' + err));
			}
		});
	});
}

module.exports = DataProvider;
