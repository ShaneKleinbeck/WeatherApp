var express = require('express');
var app = express();
var request = require('request');
var moment = require('moment');

app.use(express.static(__dirname + '/'));

app.route('/')
  .get(function(req, res){

		// ******  Set DarkSky API URL  ******
    var url = "https://api.darksky.net/forecast/379c15beaf1957c0afaca05bd48f9423/37.8267,-122.4233";

		// ******  Retrieve Data  ******
		request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
				// ******  Parse To String  ******
	      var data = JSON.parse(body);
	      res.render('index.ejs', {data: data});
	    } else {
	      console.log(error);
	      console.log(response.statusCode);
	    }
	  });



  // End .Get 
	});

app.listen(process.env.PORT || 8000);
console.log('CONNECTED');