var fs 			= require('fs'),
 		isValid = require('is-valid-path'),
		inArray = require('in-array');

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

	/**
	 * Finds an id that is not already used in the given html document
	 */
	findUnusedId : function($) {
		  var usedIds = $('[cms!=""][cms]').map( function(i,elem) {
		      return $(elem).attr("cms");
		  }).get();

		  var newId=0
		  for(; inArray(usedIds, newId.toString()); newId++){}
		  return newId;
	}

};