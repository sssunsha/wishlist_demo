
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
//app.post('/', function (req, res){
//	//include.logger.trace('post request for server');
//	res.header("Access-Control-Allow-Origin", "*");
//	
//});

// handle get request from website for request rating data 
app.get('/wishlist*', function (req, res) {
	console.log("GET /wishlist request");
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET");
	res.setHeader("Access-Control-Allow-Headers", 
		"accept, hybris-tenant, hybris-roles, content-type, authorization, hybris-user, hybris-app");
	oauth.create_oauth(req,res, "get_wishlist");
});

app.get('/wishlist_size', function (req, res) {
	console.log("GET /wishlist_size request");
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET");
	res.setHeader("Access-Control-Allow-Headers", 
		"accept, hybris-tenant, hybris-roles, content-type, authorization, hybris-user, hybris-app");
	oauth.create_oauth(req,res, "get_wishlist_size");
});

// handle get request from website to check the feedback(only for test)
app.post('/wishlist', function (req, res) {
	console.log("POST /wishlist request");
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "POST");
	res.setHeader("Access-Control-Allow-Headers", 
		"accept, hybris-tenant, hybris-roles, content-type, authorization, hybris-user, hybris-app");
	oauth.create_oauth(req,res, "post_wishlist");

});

app.options('/wishlist*',function (req, res){
	console.log("OPTIONS /wishlist request");
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET");
	res.setHeader("Access-Control-Allow-Headers", 
		"accept, hybris-tenant, hybris-roles, content-type, authorization, hybris-user, hybris-app");
	res.send('ok', 200);
});

// other request will be forbidden
app.use(function(req,res){
	res.send('failed', 404);
});


// Launch server
app.listen(8080);
