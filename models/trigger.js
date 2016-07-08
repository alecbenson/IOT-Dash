'use strict';

var mongoose = require('mongoose');

var trigger = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Trigger', trigger);
