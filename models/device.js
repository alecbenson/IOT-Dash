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
		required: true,
    unique: true
	},
  triggers: [{
		type: String,
		required: true,
	}]
});


module.exports = mongoose.model('Device', device);
