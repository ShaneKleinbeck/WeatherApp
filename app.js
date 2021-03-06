// Library Imports
var express = require('express');
var app = express();
var request = require('request');
var moment = require('moment');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// Local Imports
var weatherIcon = require('./public/js/weather-icon.js');

// Set Middleware For Static Files
app.use(express.static(__dirname + '/'));

// Middleware For Authentication
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Main Route
app.route('/')
	.get(function(req, res){
		res.render('index.ejs');
	})

// User Route
app.route('/user')
  	.get(function(req, res){

		// Request API JSON From Google
		var locationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=davie&key=AIzaSyBmhUeyk5R5TZ9rPxmRkjY5znzAdejPNCk`;
		request(locationUrl, function(error, response, body){
			if(!error && response.statusCode === 200){
				var locationData = JSON.parse(body);
				var lat = locationData['results'][0]['geometry']['location']['lat'];
				var lng = locationData['results'][0]['geometry']['location']['lng'];
				var latlng = lat + ',' + lng;

				// Request API JSON From Dark Sky
				var url = `https://api.darksky.net/forecast/379c15beaf1957c0afaca05bd48f9423/${latlng}`;
				request(url, function(error, response, body){
					if(!error && response.statusCode === 200){
						// Variable Assignments
						var data = JSON.parse(body);
						var currentIcon = weatherIcon.pickIcon(data['currently']['icon']);
						var currentTemp = Math.round(data['currently']['temperature']);
						var apparentTemp = Math.round(data['currently']['apparentTemperature']);
						var currentWind = Math.round(data['currently']['windSpeed']);
						var currentDay = moment.unix(data['currently']['time']).format('dddd, Do');
						var remainingDays = {
							1: { 
								'day': moment.unix(data['daily']['data'][1]['time']).format('dddd'),
								'icon': weatherIcon.pickIcon(data['daily']['data'][1]['icon']),
								'temp': Math.round(data['daily']['data'][1]['temperatureMax']) },
							2: {
								'day': moment.unix(data['daily']['data'][2]['time']).format('dddd'),
								'icon': weatherIcon.pickIcon(data['daily']['data'][2]['icon']),
								'temp': Math.round(data['daily']['data'][2]['temperatureMax']) },
							3: {
								'day': moment.unix(data['daily']['data'][3]['time']).format('dddd'),
								'icon': weatherIcon.pickIcon(data['daily']['data'][3]['icon']),
								'temp': Math.round(data['daily']['data'][3]['temperatureMax']) },
							4: {
								'day': moment.unix(data['daily']['data'][4]['time']).format('dddd'),
								'icon': weatherIcon.pickIcon(data['daily']['data'][4]['icon']),
								'temp': Math.round(data['daily']['data'][4]['temperatureMax']) },
							5: {
								'day': moment.unix(data['daily']['data'][5]['time']).format('dddd'),
								'icon': weatherIcon.pickIcon(data['daily']['data'][5]['icon']),
								'temp': Math.round(data['daily']['data'][5]['temperatureMax']) },
							6: {
								'day': moment.unix(data['daily']['data'][6]['time']).format('dddd'),
								'icon': weatherIcon.pickIcon(data['daily']['data'][6]['icon']),
								'temp': Math.round(data['daily']['data'][6]['temperatureMax'])
							}
						};

						// Render Data to Index
						res.render('user.ejs', { 
							currentIcon: currentIcon,
							currentTemp: currentTemp,
							apparentTemp: apparentTemp,
							currentWind: currentWind,
							currentDay: currentDay,
							remainingDays: remainingDays
						});
					} else {
						console.log(response.statusCode);
						console.log(error);
					};
				});
				// End Dark Sky Request
			} else {
				console.log(response.statusCode);
				console.log(error);
			};
		});
		// End Google Request
	});

app.listen(process.env.PORT || 8000);
console.log('CONNECTED');