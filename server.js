var express     = require( 'express' ),
    app         = express(),
    nunjucks    = require( 'nunjucks' ),
    bodyParser  = require( 'body-parser' ),
    fs          = require('fs'),
    moment      = require('moment'),
    cheerio     = require('cheerio'),
    passport    = require('passport'),
    Strategy    = require('passport-local').Strategy;

// local libs  
var db 			= require('./db'),
	utils       = require('./utils');


var port = process.env.PORT || 9000 ;       // Define port to run server on

// Configure Nunjucks
var _templates = process.env.NODE_PATH ? process.env.NODE_PATH + '/templates' : 'templates' ;
nunjucks.configure( _templates, {
    autoescape: true,
    cache: false,   // Set true in production
    express: app,
    watch: true     // Set true in production
} ) ;
// Set Nunjucks as rendering engine for pages with .html suffix
app.engine( 'html', nunjucks.render ) ;
app.set( 'view engine', 'html' ) ;

app.use(express.static('static'));          // Directory with static files
app.use(express.static('node_modules'));
app.use(bodyParser.json())                  // Use JSON format for request body mapping





// Configure the authentication strategy for Passport. With the `verify` function
// which receives the credentials (username and password) submitted by the user.
// After authenticating an user, cb is called with an user object
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));



  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
      cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });


// Initialize Passport and restore authentication state from the session.
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/home' }),
        function(req, res) {
            res.redirect('/'); // TODO externalize post login page
});


app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/'); // TODO externalize post logout page
});




// Default landing page
// TODO The default page should be set as constant anywhere
app.get( '/', function( req, res ) {
    res.redirect('/home');
} ) ;

// Respond to all GET requests by rendering relevant page using Nunjucks
app.get( '/:page', function( req, res ) {
    res.render( req.params.page+'.html', {
        currentPage: req.params.page,
        isAuth: !!req.user
    });
    console.log("USER", req.user);
} ) ;

// TODO protect endpoint for only authenticated users
app.put( '/:page', function( req, res ) {
    var newContent = req.body;
    var htmlFileName =  __dirname + '/templates/' + req.params.page + '.html';
    
    var date = moment().format("YYYY-MM-DD_HHmmss");
    var htmlCopyName =  __dirname + '/templates/backup/' + req.params.page + date + '.html';
    
    // backup
    utils.copy(htmlFileName, htmlCopyName, function(){});
    
    // update
    fs.readFile( htmlFileName, 'utf8', function(err, html){
        var newHtml = updateHtmlContent(newContent, html)

        fs.writeFile(htmlFileName, newHtml, function(err) {
            if(err) {
                res.status(400);
                return console.log(err);
            }
        })
        console.log("The file was saved!");
    }
)
     res.send('');
     res.status(200);
} ) ;


updateHtmlContent = function(content, html){
      $ = cheerio.load(html, {decodeEntities: false});
      Object.keys(content).forEach(function(cmsId) {
             $('div[cms='+cmsId+']').html(content[cmsId]);
      });
      return $.html();
}
// Start server
app.listen( port ) ;
console.log( 'Server running at http://localhost:%s', port ) ;
