'use strict';

var request = require('request');
var Promise = require('bluebird');
var winston = require('winston');

var DataProvider = function (input, type) {
	if (!input) {
		winston.log('error', 'No input object provided to data provider');
		return;
	}

	switch (type) {
	case 'location':
		this.action = function () {
			return this.getLocation(input.params.ip);
		};
		break;
	case 'date':
		this.action = function () {
			return this.getDateTime();
		};
		break;
	case 'weather':
		this.action = function () {
			return this.getWeather(input.params.zip, input.params.key);
		};
		break;
	default:
		this.action = function () {
			return this.request(input.requestType, input.url, input.params, 2000);
		};
		break;
	}
};

DataProvider.prototype.doAction = function () {
	return this.action();
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
	var fullUrl = params ? url + _objToQueryParams(params) : url;
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

//Use openweatherMap to get the weather
DataProvider.prototype.getWeather = function (zip, key) {
	var base = 'http://api.openweathermap.org/data/2.5/weather';
	var params = {
		q: zip,
		appid: key
	}
	return this.getRequest('GET', base, params);
}

//Use freegeoip to approximate location
DataProvider.prototype.getLocation = function (ip) {
	var base = 'http://freegeoip.net/json/';
	var fullURL = ip ? base + encodeURIComponent(ip) : base
	return this.request('GET', fullURL);
}

//Return a promise to date and time
DataProvider.prototype.getDateTime = function () {
	return new Promise(function (resolve) {
		var d = new Date();
		var dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var values = {
			hours: d.getHours(),
			minutes: d.getMinutes(),
			seconds: d.getSeconds(),
			day: d.getUTCDate(),
			month: d.getUTCMonth() + 1,
			year: d.getUTCFullYear(),
			weekDay: dayMap[d.getDay()]
		}
		resolve(values);
	});
}

module.exports = DataProvider;
