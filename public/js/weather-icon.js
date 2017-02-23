'use strict';

var pickIcon = function(day){
   var icon = {
      'clear-day': 'Sun.svg',
      'clear-night': 'Moon.svg',
      'rain': 'Cloud-Rain.svg',
      'snow': 'Cloud-Snow.svg',
      'sleet': 'Cloud-Snow.svg',
      'wind': 'Wind.svg',
      'fog': 'Cloud-Fog.svg',
      'cloudy': 'Cloud.svg',
      'partly-cloudy-day': 'Cloud-Sun.svg',
      'partly-cloudy-night': 'Cloud-Moon.svg',
      'hail': 'Cloud-Hail.svg',
      'thunderstorm': 'Cloud-Lightning.svg',
      'tornado': 'Tornado.svg',
      'default': 'Cloud.svg'
   };
   return icon[day];
};

module.exports.pickIcon = pickIcon;
