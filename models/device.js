'use strict';

var mongoose = require('mongoose');

var device = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	ip: {
		type: String,
		required: true
	},
	triggers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Trigger',
		required: false
	}]
});


module.exports = mongoose.model('Device', device);
