var http = require('http');
var querystring = require('querystring');
var constant = require("./constant");
var wishlist = require("./wishlist_helper");

var access_token = "";
function create_oauth(sreq,sres, type){
	
	var contents = querystring.stringify({
	    grant_type: constant.grant_type,
	    client_id: constant.client_id,
	    client_secret: constant.client_secret,
	    scope: constant.scope
	});
	
	var options = {
	    host: constant.token_host,
	    path: constant.token_path,
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Content-Length': contents.length
	    }
	};
	
	var body = '';
	var req = http.request(options, function(res) {
  		console.log("Got create_oauth response: " + res.statusCode);
  			res.on('data',function(data){
  			body += data;
 		}).on('end', function(){
  			// console.log(res.headers)
  			// console.log(body);
  			access_token =  JSON.parse(body).access_token; 
  			console.log(access_token);
  			
  			// handle request
  			if(type === "get_wishlist")
  			{
  				wishlist.get_wishlists(sreq,sres);
  			}
  			else if(type === "get_wishlist_size")
  			{
  				wishlist.get_wishlist_size(sreq,sres);
  			}
  			else if(type === "post_wishlist")
  			{
  				wishlist.add_wishlist(sreq,sres);
  			}
  			else
  			{
  				sres.send("invalid request parm");
  			}
  			
 	});

}).on('error', function(e) {
  		console.log("Got create_oauth error: " + e.message);
  		access_token = "";
  		sres.send("create_oauth failed");
		})
	
	req.write(contents);
	req.end();
}

function get_access_token(){
	return access_token;
}



module.exports.create_oauth = create_oauth;
module.exports.get_access_token = get_access_token;