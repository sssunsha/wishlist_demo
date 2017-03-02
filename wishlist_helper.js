var http = require('http');
var querystring = require('querystring');
var constant = require("./constant");
var oauth = require("./oauth_helper");

function add_wishlist(sreq,sres){
	console.log("start add_wishlist");

	
	var contents = sreq.body;
	var owner = contents["owner"];
	owner = owner.replace(".", "_");
	owner = owner.replace("@", "_");
	var path = "/data/" + owner + "/"; 
	console.log(path);
	
	var options = {
		host: constant.base_host,
    	path: constant.base_path + constant.tenant + "/"  + constant.client_name + path,
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json',
	        'Authorization': 'Bearer ' + oauth.get_access_token(),
	        'Content-Length': JSON.stringify(contents).length
	    }
	};
			
	var body = '';
	var req = http.request(options, function(res) {
  		console.log("Got add_wishlist response: " + res.statusCode);
  			res.on('data',function(data){
  			body += data;
 		}).on('end', function(){
  			sres.send("add_wishlist succeed");
  			console.log(body);
 			});
		}).on('error', function(e) {
		  		console.log("Got add_wishlist error: " + e.message);
		  		sres.send("add_wishlist failed");
				})

	req.write(JSON.stringify(contents));
	req.end();
}

function get_wishlist_size (sreq,sres) {
	console.log("start get_wishlist_size");
	var options = {
		host: constant.base_host,
    	path: constant.base_path + constant.tenant + "/"  + constant.client_name+"/data/wishlist/",
	    method: 'GET',
	    headers: {
	        'Content-Type': 'application/json',
	        'Authorization': 'Bearer ' + oauth.get_access_token()
	    }
	};	
	
	var body = '';
	var req = http.request(options, function(res) {
  		console.log("Got get_wishlists response: " + res.statusCode);
  			res.on('data',function(data){
  			body += data;
 		}).on('end', function(){
 			console.log("");
  			// console.log(res.headers);
  			// console.log(body);
  			var size = 0;
  			var wishilst_data = JSON.parse(body);
  			size = wishilst_data.length;
  			console.log(size);
  			sres.send(size.toString());
 			});
		}).on('error', function(e) {
		  		console.log("Got get_wishlist_size error: " + e.message);
		  		sres.send("get_wishlist_size failed");
				})
	req.end();
}

function get_wishlists(sreq,sres){
	console.log("start get_wishlists");
	var params = sreq["params"].toString();
	var path = "/data" + params+ "/";
	console.log(path);

	var options = {
		host: constant.base_host,
    	path: constant.base_path + constant.tenant + "/"  + constant.client_name + path,
	    method: 'GET',
	    headers: {
	        'Content-Type': 'application/json',
	        'Authorization': 'Bearer ' + oauth.get_access_token()
	    }
	};	
	
	var body = '';
	var req = http.request(options, function(res) {
  		console.log("Got get_wishlists response: " + res.statusCode);
  			res.on('data',function(data){
  			body += data;
 		}).on('end', function(){
 			// console.log("");
  			// console.log(res.headers);
//  			 console.log(body);
  			sres.send(body);
 			});
		}).on('error', function(e) {
		  		console.log("Got get_wishlists error: " + e.message);
		  		sres.send("get_wishlists failed");
				})
	req.end();
	
}

module.exports.add_wishlist = add_wishlist;
module.exports.get_wishlist_size = get_wishlist_size;
module.exports.get_wishlists = get_wishlists;