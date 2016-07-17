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

var trigger = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	conditions: [{
		key: String,
		value: String,
		operator: String,
		opchain: String
	}],
	input: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Input',
		required: true
	}
}, schemaOpts);

//Get the full request for displaying
trigger.virtual('summary').get(function () {
	var result = 'Triggers when ';
	this.conditions.forEach(function (condition) {
		result += condition.key + ' is ' + condition.operator + ' ' + condition.value
		if (condition.opchain) {
			result += ' ' + condition.opchain + ' ';
		}
	});
	return result;
});

module.exports = mongoose.model('Trigger', trigger);
