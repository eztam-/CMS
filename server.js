var express     = require( 'express' ),
    app         = express(),
    nunjucks    = require( 'nunjucks' ),
    bodyParser  = require( 'body-parser' ),
    fs          = require('fs'),
    cheerio     = require('cheerio');

// Define port to run server on
var port = process.env.PORT || 9000 ;

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

// Directory with static files
app.use(express.static('static'));
app.use(express.static('node_modules'));

// Use JSON for request body mapping
app.use(bodyParser.json())

// Default landing page
// TODO The default page should be set as constant anywhere
app.get( '/', function( req, res ) {
    res.redirect('/home');
} ) ;

// Respond to all GET requests by rendering relevant page using Nunjucks
app.get( '/:page', function( req, res ) {
    res.render( req.params.page+'.html', {currentPage: req.params.page});
} ) ;

app.put( '/:page', function( req, res ) {
    var newContent = req.body;
    var htmlFileName =  __dirname + '/templates/' + req.params.page + '.html';
    fs.readFile( htmlFileName, 'utf8', function(err, html){
        var newHtml = updateHtmlContent(newContent, html)
        console.log(newHtml);

        fs.writeFile(htmlFileName, newHtml, function(err) {
        if(err) {
            return console.log(err);
        }
        })

        console.log("The file was saved!");

    }
)
    res.status(200);
    //res.render( req.params.page+'.html', {currentPage: req.params.page});

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
