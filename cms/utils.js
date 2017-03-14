"use strict";
var fs 			= require('fs'),
 		isValid = require('is-valid-path'),
		inArray = require('in-array'),
    CONFIG  = require('./config/conf'),
    cheerio = require('cheerio'),
    moment = require('moment')

/**
 * Finds an id that is not already used in the given html document
 */
let findUnusedId = function($) {
    var usedIds = $('[cms!=""][cms]').map( function(i,elem) {
        return $(elem).attr("cms");
    }).get();

    var newId=0
    for(; inArray(usedIds, newId.toString()); newId++){}
    return newId;
};


let copy = (source, target, cb) => {
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
}

module.exports = {





  /**
  * Reads the page with the given names and generates ID's for all cms tags that do not have an ID yet
  */
  generateIds : function(pageName) {

  	var htmlFileName = __dirname + CONFIG.templatesDir + '/' + pageName + '.html';
  	// update
  	fs.readFile(htmlFileName, 'utf8', function(err, html) {
  		let $ = cheerio.load(html, { decodeEntities : false });

  		// Add generated ids to cms attributes which have no id yet
  		$('[cms=""]').each(function() {
  			$(this).attr("cms", findUnusedId($));
  		});
  		var newHtml = $.html();

  		// save
  		fs.writeFile(htmlFileName, newHtml, function(err) {
  			if (err) {
  				res.status(400);
  				return console.log(err);
  			}
  		})
  		console.log("-- OK -- The file was saved! (generating ids finished)");
  	});

  },

  readFile : (filename, encoding) => {
      return new Promise((resolve, reject) => {
          fs.readFile(filename, encoding, (err, data) =>{
              if (err)
                  reject(err)
              else
                  resolve(data)
          })
      })
  },

  writeFile : (filename, data, encoding) => {
      return new Promise((resolve, reject) => {
           fs.writeFile(filename, data, 'utf8', (err) => {
              if (err)
                  reject(err)
              else
                  resolve()
          })
      })
  },

  backup : (sourcePath, pageName) => {
  	var date = moment().format("YYYY-MM-DD_HHmmss");
  	var targetPath = __dirname + CONFIG.templatesDir + '/backup/' + pageName + date
  			+ '.html';
  	// copy
  	copy(sourcePath, targetPath, function() {
  	});
  },

  updateHtmlContent : (content, html) => {
    return new Promise((resolve, reject) => {
        console.log("2")
        let jquery = cheerio.load(html, { decodeEntities : false })
      	Object.keys(content).forEach(function(cmsId) {
      		  jquery('[cms=' + cmsId + ']').html(content[cmsId])
      	})
        resolve(jquery.html())
        })
    },




};
