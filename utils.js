var fs = require('fs');
var isValid = require('is-valid-path');

// utils.js
// ========
module.exports = {

	copy : function(source, target, cb) {
		console.log('Coping started from %s to %s', source, target);

		// TODO validate paths
		if (!isValid(source) || !isValid(target)) {
			// npm install is-valid-path --save
			console.log('-- ERROR -- invalid path(s) source %s and target %s',
					source, target);
			return;
		}
		var cbCalled = false;
		var rd = fs.createReadStream(source);

		rd.on("error", function(err) {
			done(err);
		});

		var wr = fs.createWriteStream(target);
		wr.on("error", function(err) {
			done(err);
			console.log("-- ERROR -- occured while coping!");
		});

		wr.on("close", function(ex) {
			done();
		});

		rd.pipe(wr);

		function done(err) {
			if (!cbCalled) {
				cb(err);
				cbCalled = true;
			}
		}
		console.log('-- OK -- coping finished.');
	},

	random : function() {
		var result = "";
		var length = 4;
		var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < length; i++)
			result += possible
					.charAt(Math.floor(Math.random() * possible.length));

		return result;
	}
};