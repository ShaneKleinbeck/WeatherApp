$(document).ready(function(){

    // Get Date Object
    var setDate = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var day = days[setDate.getDay()];
    var date = setDate.getDate();
    // Print Date To HTML
    document.getElementById('current-day-left').innerHTML += '<h5 id="currentDay">' + day + ', ' + date + '<sup>th</sup></h5>';

});
    


