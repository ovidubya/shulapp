var request = require('request');
var express = require('express');
var app = express();
var jsdom = require("jsdom");
var rp = require('request-promise');
var { JSDOM } = jsdom;
var path = require('path');
var shul = require('./shuls/shul_strategy');
app.use(express.static(__dirname + '/resources'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/shultimes', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var yeshurn = rp('https://www.adasyeshurun.com/').promise();
    var mikor = rp('https://www.mikorhachaim.org/').promise();
    Promise.all([yeshurn, mikor]).then(function(values) {
        var response = {};
        response.yeshurn = shul.getTimes(values[0]);
        response.mikor = shul.getTimes(values[1]); 
        
        res.send(JSON.stringify(response, null, 2));

    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));