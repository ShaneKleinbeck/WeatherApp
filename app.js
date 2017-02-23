// Library Imports
var express = require('express');
var app = express();
var request = require('request');
var moment = require('moment');

// Local Imports
var weatherIcon = require('./public/js/weather-icon.js');

// Variable Declarations
var data = null;
var currentIcon = null;
var currentTemp = null;
var currentWind = null;
var currentDay = null;
var remainingDays = null;
var remainingIcons = null;

// Set Middleware For Static Files
app.use(express.static(__dirname + '/'));

// Main Route
app.route('/')
  	.get(function(req, res){
		// Request API JSON From Dark Sky
	  	var url = 'https://api.darksky.net/forecast/379c15beaf1957c0afaca05bd48f9423/37.8267,-122.4233';
		request(url, function(error, response, body){
			if(!error && response.statusCode === 200){

				// Variable Assignments
				var data = JSON.parse(body);
				var currentIcon = weatherIcon.pickIcon(data['currently']['icon']);
				var currentTemp = Math.round(data['currently']['temperature']);
				var currentWind = Math.round(data['currently']['windSpeed']);
				var currentDay = moment.unix(data['currently']['time']).format('dddd, Do');
				var remainingDays = {
					1: { 
						'day': moment.unix(data['daily']['data'][1]['time']).format('dddd'),
						'icon': weatherIcon.pickIcon(data['daily']['data'][1]['icon']) },
					2: {
						'day': moment.unix(data['daily']['data'][2]['time']).format('dddd'),
						'icon': weatherIcon.pickIcon(data['daily']['data'][2]['icon']) },
					3: {
						'day': moment.unix(data['daily']['data'][3]['time']).format('dddd'),
						'icon': weatherIcon.pickIcon(data['daily']['data'][3]['icon']) },
					4: {
						'day': moment.unix(data['daily']['data'][4]['time']).format('dddd'),
						'icon': weatherIcon.pickIcon(data['daily']['data'][4]['icon']) },
					5: {
						'day': moment.unix(data['daily']['data'][5]['time']).format('dddd'),
						'icon': weatherIcon.pickIcon(data['daily']['data'][5]['icon']) },
					6: {
						'day': moment.unix(data['daily']['data'][6]['time']).format('dddd'),
						'icon': weatherIcon.pickIcon(data['daily']['data'][6]['icon'])
					}
				};

				// Render Data to Index
				res.render('index.ejs', { 
						currentIcon: currentIcon,
						currentTemp: currentTemp,
						currentWind: currentWind,
						currentDay: currentDay,
						remainingDays: remainingDays
				});
			} else {
				console.log(error);
			}
		});
	});

app.listen(process.env.PORT || 8000);
console.log('CONNECTED');