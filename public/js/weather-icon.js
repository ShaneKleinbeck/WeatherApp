'use strict';

var pickIcon = function(day){
   var icon = {
      'clear-day': 'wi-day-sunny',
      'clear-night': 'wi-night-clear',
      'rain': 'wi-day-rain',
      'snow': 'wi-snow',
      'sleet': 'wi-sleet',
      'wind': 'wi-strong-wind',
      'fog': 'wi-fog',
      'cloudy': 'wi-cloud',
      'partly-cloudy-day': 'wi-day-cloudy',
      'partly-cloudy-night': 'wi-day-cloudy',
      'hail': 'wi-hail',
      'thunderstorm': 'wi-thunderstorm',
      'tornado': 'wi-tornado'
   };
   return icon[day];
};

module.exports.pickIcon = pickIcon;
