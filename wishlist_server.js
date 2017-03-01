
var application_root = __dirname,
    express = require("express"),
    path = require("path");
    
var include = require("./include");
var constant = require("./constant");
var oauth = require("./oauth_helper");


var app = express();

// Config

app.configure(function () {
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.staticCache());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


/**********************************************
 *  request handle functions
 * ********************************************
 */

// handle the post request for app
app.post('/', function (req, res){
	//include.logger.trace('post request for server');
	res.header("Access-Control-Allow-Origin", "*");
	
});

// handle get request from website for request rating data 
app.get('/wishlist', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	oauth.create_oauth(req,res, "get_wishlist");
});

app.get('/wishlist_size', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	oauth.create_oauth(req,res, "get_wishlist_size");
});

// handle get request from website to check the feedback(only for test)
app.post('/wishlist', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	oauth.create_oauth(req,res, "post_wishlist");

});

// other request will be forbidden
app.use(function(req,res){
    res.redirect('404.html');
});


// Launch server
app.listen(8080);
