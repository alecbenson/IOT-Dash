'use strict';

var mongoose = require('mongoose');

var schemaOpts = {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
};

var input = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	requestType: {
		type: String,
		required: true,
		enum: ['GET', 'PUT', 'POST']
	},
	url: {
		type: String,
		required: false
	},
	apikey: {
		type: String,
		required: false
	}
}, schemaOpts);

//Get the full request for displaying
input.virtual('fullUrl').get(function () {
	var url = this.url;
	var fullURL = url.replace(/\{\{apiKey\}\}/i, this.apikey);
	return fullURL;
});


module.exports = mongoose.model('Input', input);
