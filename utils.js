var fs = require('fs');

// utils.js
// ========
module.exports = {

	copy : function(source, target, cb) {
		var cbCalled = false;
		console.log('Backup started for %s to %s', source, target);

		var rd = fs.createReadStream(source);
		rd.on("error", function(err) {
			done(err);
		});

		var wr = fs.createWriteStream(target);
		wr.on("error", function(err) {
			done(err);
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
	}
};