'use strict'

var db = require('../db');
db.connectTest();

describe('Inputs', function () {
	//Start with a fresh db
	before(function (done) {
		db.connectTest();
		db.drop();
		done();
	});
});
