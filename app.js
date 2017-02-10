var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

app.route('/')
    .get(function(req, res){
        res.render('index.html');
    });

app.listen(process.env.PORT || 8000);
console.log('CONNECTED');