var express      = require( 'express' ),
    app          = express(),
    nunjucks     = require( 'nunjucks' ),
    bodyParser   = require( 'body-parser' ),
    fs           = require('fs'),
    moment       = require('moment'),
    cheerio      = require('cheerio'),
    flash        = require('connect-flash'),
    morgan       = require('morgan'),
    passport     = require('passport');

// local libs
var db 			= require('./db'),
	utils       = require('./utils');
require('./config/passport')(passport); // pass passport for configuration

var port = process.env.PORT || 9000; // Define port to run server on

// Configure Nunjucks
var _templates = process.env.NODE_PATH ? process.env.NODE_PATH + '/templates'
		: 'templates';
nunjucks.configure(_templates, {
	autoescape : true,
	cache : false, // Set true in production
	express : app,
	watch : true
// Set true in production
});
// Set Nunjucks as rendering engine for pages with .html suffix
app.engine('html', nunjucks.render);
app.set('view engine', 'html');


app.use(express.static('static')); // Directory with static files
app.use(express.static('node_modules'));
app.use(bodyParser.json()) // Use JSON format for request body mapping
app.use(morgan('dev')); // log every request to the console
app.use(flash()); // use connect-flash for flash messages stored in session

// Initialize Passport and restore authentication state from the session.
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
	extended : true
}));
app.use(require('express-session')({
	secret : 'keyboard cat',
	resave : false,
	saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());


//app.post('/login', passport.authenticate('local', {
//	failureRedirect : '/home'
//}), function(req, res) {
//	res.redirect('/'); // TODO externalize post login page
//});

// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/'); // TODO externalize post logout page
});

// Default landing page
// TODO The default page should be set as constant anywhere
app.get('/', function(req, res) {
	res.redirect('/home');
});

// Respond to all GET requests by rendering relevant page using Nunjucks
app.get('/:page', function(req, res) {

	var pageName = req.params.page;

	// generate ids for cms tagged elements
  	if (req.user) {
		// TODO fix this favicon problem!!!
		if (pageName !== 'favicon.ico') {
			// not finished yet
			 generateIds(pageName);
		}
	}
	res.render(pageName + '.html', {
		currentPage : pageName,
		isAuth : !!req.user
	});
	res.locals.messages = req.flash('message');
	console.log("USER", req.user);
});

// TODO protect endpoint for only authenticated users
app.put('/:page', function(req, res) {
	var newContent = req.body;
	var htmlFileName = __dirname + '/templates/' + req.params.page + '.html';

	// backup
	backup(htmlFileName, req.params.page);

	// update
	fs.readFile(htmlFileName, 'utf8', function(err, html) {
		var newHtml = updateHtmlContent(newContent, html)

		fs.writeFile(htmlFileName, newHtml, function(err) {
			if (err) {
				res.status(400);
				return console.log(err);
			}
		})
		console.log("-- OK -- The file was saved!");
	})
	res.send('');
	res.status(200);
});

backup = function(sourcePath, pageName) {
	var date = moment().format("YYYY-MM-DD_HHmmss");
	var targetPath = __dirname + '/templates/backup/' + pageName + date
			+ '.html';
	// copy
	utils.copy(sourcePath, targetPath, function() {
	});
}

updateHtmlContent = function(content, html) {
	$ = cheerio.load(html, {
		decodeEntities : false
	});
	Object.keys(content).forEach(function(cmsId) {
		$('[cms=' + cmsId + ']').html(content[cmsId]);
	});
	return $.html();
}

generateIds = function(pageName) {

	var htmlFileName = __dirname + '/templates/' + pageName + '.html';
	// update
	fs.readFile(htmlFileName, 'utf8', function(err, html) {
		$ = cheerio.load(html, {
			decodeEntities : false
		});

		// Add generated ids to cms attributes which have no id yet 
		$('[cms=""]').each(function() {
			$(this).attr("cms", utils.findUnusedId($));
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

}

// start server
app.listen(port);
console.log('Server running at http://localhost:%s', port);
