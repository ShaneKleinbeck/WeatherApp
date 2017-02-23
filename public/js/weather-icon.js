'use strict';

var pickIcon = function(day){
    var icon = '';
    switch(day){
        case 'clear-day':
            icon = 'Sun.svg';
            break;
        case 'clear-night':
            icon = 'Moon.svg';
            break;
        case 'rain':
            icon = 'Cloud-Rain.svg';
            break;
        case 'snow':
            icon = 'Cloud-Snow.svg';
            break;
        case 'sleet':
            icon = 'Cloud-Snow.svg.svg';
            break;
        case 'wind':
            icon = 'Wind.svg';
            break;
        case 'fog':
            icon = 'Cloud-Fog.svg';
            break;
        case 'cloudy':
            icon = 'Cloud.svg';
            break;
        case 'partly-cloudy-day':
            icon = 'Cloud-Sun.svg';
            break;
        case 'partly-cloudy-night':
            icon = 'Cloud-Moon.svg';
            break;
        case 'hail':
            icon = 'Cloud-Hail.svg';
            break;
        case 'thunderstorm':
            icon = 'Cloud-Lightning.svg';
            break;
        case 'tornado':
            icon = 'Tornado.svg';
            break;
        default:
            icon = 'Cloud.svg';
            break;
    }
    return icon;
}

module.exports.pickIcon = pickIcon;
