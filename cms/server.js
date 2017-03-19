"use strict";
const
    express     = require('express'),
    app         = express(),
    nunjucks    = require('nunjucks'),
    bodyParser  = require('body-parser'),
    fs          = require('fs'),
    flash       = require('connect-flash'),
    morgan      = require('morgan'),
    passport    = require('passport'),
    commander   = require('commander'),

    // Local libs
	  utils       = require('./utils'),
    mailService = require('./mailService'),
    CONFIG      = require('./config/conf')

require('./passport')(passport) // pass passport for configuration

// TODO Documentation
commander
  .version('0.0.1') // TODO
  .option('-p, --port <port>', 'Port to run server on', parseInt)
  .parse(process.argv)

var port = commander.port || CONFIG.port; // Define port to run server on


// Configure Nunjucks
// Multiple template paths are possible like: njucks.configure(['views',
// 'views/templates', {}
let templateFolders = [__dirname + '/clientSide/templates'  , __dirname + CONFIG.templatesDir]
nunjucks.configure( templateFolders, {
	autoescape : true,
	cache : false, // Set true in production
	express : app,
	watch : true
// Set true in production
})
// Set Nunjucks as rendering engine for pages with .html suffix
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use(express.static(__dirname + CONFIG.staticDir)); // Directory with static files
app.use('/cms_internal_libs', express.static(__dirname+'/node_modules'))
app.use('/cms_internal_static_files', express.static(__dirname+'/clientSide/static'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // Use JSON format for request body mapping
app.use(morgan('dev')) // log every request to the console
app.use(flash()) // use connect-flash for flash messages stored in session
app.use(require('cookie-parser')()); // Required by Passport to restore authentication state from the session.
app.use(require('express-session')({
    	secret : 'keyboard cat',
    	resave : false,
    	saveUninitialized : false
  }));
app.use(passport.initialize());
app.use(passport.session());


// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : CONFIG.loginSuccessPage,
    failureRedirect : CONFIG.loginFailedPage,
    failureFlash : true // allow flash messages
}));


app.get('/logout', (req, res) => {
	req.logout();
	res.redirect(CONFIG.postLogoutPage);
});

// TODO Check if this blocks the whole server thread or not
app.post('/sendmail', (req, res) => {
    mailService.sendMail(req.body.subject, req.body.message)
        .then((info) => { res.status(200).end() })
        .catch((error) => { res.status(500).end(error) })
})

// Default landing page
// TODO The default page should be set as constant anywhere
app.get('/', (req, res) => {
    if(req.query.lang){
        res.redirect('/home?lang='+req.query.lang);
    }else{
  	    res.redirect('/home');
    }
});

// Respond to all GET requests by rendering relevant page using Nunjucks
app.get('/:page', (req, res) => {

	var pageName = req.params.page;

  // TODO fix this favicon problem!!!
  if (pageName === 'favicon.ico') {
      res.status(404).end()
      return
  }
	// generate ids for cms tagged elements if the user is logged in
  if (req.user) {
			 utils.generateIds(pageName)
       .then()
       .catch((err) => {
          res.status(404).end()
          return
       })
	}
	res.render(pageName + '.html', {
  		currentPageName : pageName,
  		isAuthenticated : !!req.user,
      language : req.query.lang ? req.query.lang : CONFIG.defaultLanguage,
      defaultLanguage : CONFIG.defaultLanguage,
      supportedLanguages: CONFIG.supportedLanguages
	})
	res.locals.messages = req.flash('message') // TODO For what is this needed?
})


// TODO protect endpoint for only authenticated users
app.put('/:page', (req, res) => {

	if (!req.user) { // TODO Auth check should be done in a more generic way
    res.status(401).end()
    return
  }

  // TODO Check security concerns
	var htmlFileName = __dirname + CONFIG.templatesDir + '/' + req.params.page + '.html';

  // TODO this is not working! Why?
  // TODO Add this to the promise chain below
	utils.backup(htmlFileName, req.params.page);

  utils.readFile(htmlFileName, 'utf8')
      .then((html) => utils.updateHtmlContent(req.body, html))
      .then((updatedHtml) => utils.writeFile(htmlFileName, updatedHtml, 'utf8'))
      .then(() => { res.status(200).end() })
      .catch((err) => {
          console.log(err)
          res.status(400).end()
      })
})


// TODO add clustering that uses one cluster per CPU core or a CONFIG value
// start server
app.listen(port);
console.log('Server running at http://localhost:%s', port);
