"use strict";
var bcrypt = require('bcrypt-nodejs');

var usersDb = require('./users.json');

exports.findById = function(id, cb) {
	process.nextTick(function() {

		// search
		var result;
		for (var i = 0; i < usersDb.length; i++) {
			if (usersDb[i].id === id) {

				result = usersDb[i];
			}
		}
		// return
		if (result) {
			cb(null, result);
		} else {
			cb(new Error('User ' + id + ' does not exist'));
		}
	});
}

exports.findByUsername = function(username, cb) {
	process.nextTick(function() {
		for (var i = 0; i < usersDb.length; i++) {
			if (usersDb[i].username === username) {
				return cb(null, usersDb[i]);
			}
		}
		return cb(null, null);
	});
}

// generating a hash
exports.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
exports.validPassword = function(username, password, cb) {
	// ??? var userFromDb = exports.findByUsername(username);

	var passwordFromDb;
	var userFromDb;
	for (var i = 0; i < usersDb.length; i++) {
		if (usersDb[i].username === username) {
			userFromDb = usersDb[i];
			break;
		}
	}
	console.log('---- given password ----');
	console.log(bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));

	if (userFromDb) {
		var passwordOK = bcrypt.compareSync(password, userFromDb.password);
		if (passwordOK) {
			return cb(null, userFromDb);
		}
	}
	return cb(null, null);
};
