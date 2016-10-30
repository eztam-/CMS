var bcrypt   = require('bcrypt-nodejs');

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


//generating a hash
exports.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
exports.validPassword = function(username, password) {
	// ??? var userFromDb = exports.findByUsername(username);
	
	for (var i = 0; i < usersDb.length; i++) {
		if (usersDb[i].username === username && usersDb[i].password === password) {
			return true;
		}
	}
	return false;
	//return bcrypt.compareSync(password, passwordFromDb);
};