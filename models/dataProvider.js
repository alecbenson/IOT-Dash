'use strict';

var request = require('request');
var Promise = require('bluebird');


var DataProvider = function (mongoInput) {
	this.input = mongoInput;
};

//Helper function to generate query params based on a passed in object
function _objToQueryParams(params) {
	var parts = [];
	for (var i in params) {
		if (params.hasOwnProperty(i)) {
			var p = encodeURIComponent(i) + '=' + encodeURIComponent(params[i]);
			parts.push(p);
		}
	}
	return '?' + parts.join('&');
}

//Issue a git request with the given params object and the specified timeout period
DataProvider.prototype.getRequest = function (url, params, timeout) {
	var fullUrl = params ? url + _objToQueryParams(params) : url;
	console.log(fullUrl);
	//Issue request
	return new Promise(function (resolve, reject) {
		request({
			uri: fullUrl,
			method: 'GET',
			timeout: (timeout || 2000)
		}, function (err, response, body) {
			if (!err) {
				resolve(body);
			} else {
				reject(new Error('GET REQUEST: ' + err));
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
	return this.getRequest(base, params);
}

//Use freegeoip to approximate location
DataProvider.prototype.getLocation = function () {
	var base = 'http://freegeoip.net/json/';
	return this.getRequest(base);
}

//Return a promise to date and time
DataProvider.prototype.getDateTime = function () {
	return new Promise(function (resolve, reject) {
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
