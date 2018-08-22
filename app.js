var request = require('request');
var express = require('express');
var app = express();
var jsdom = require("jsdom");
var rp = require('request-promise');
var { JSDOM } = jsdom;
var path = require('path');
var shul = require('./shuls/shul_strategy');
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/resources'));

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/shultimes', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var yeshurn = rp('https://www.adasyeshurun.com/').promise();
    var mikor = rp('https://www.mikorhachaim.org/').promise();
    var chodorov = rp('https://www.khaloyc.org/').promise();
    Promise.all([yeshurn, mikor, chodorov]).then(function(values) {
        var response = {};
        response.yeshurn = shul.getTimes(values[0]);
        response.mikor = shul.getTimes(values[1]); 
        response.chodorov = shul.getTimes(values[2]);
        
        res.send(JSON.stringify(response, null, 2));

    });
});
app.post('/shultimes', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var clientRequest = req.body;
    var handlePromises = [];
    var index = -1;
    if(clientRequest.includes('yeshurn')) {
        handlePromises.push(rp('https://www.adasyeshurun.com/').promise());
        index++;
    }
    if(clientRequest.includes('mikor')) {
        handlePromises.push(rp('https://www.mikorhachaim.org/').promise());
        index++;
    }
    if(clientRequest.includes('chodorov')) {
        handlePromises.push(rp('https://www.khaloyc.org/').promise());
        index++;
    }
    if(clientRequest.includes('agudah')) {
        handlePromises.push(rp('https://www.aywrp.org/').promise());
        index++;
    }
    Promise.all(handlePromises).then(function(values) {
        var response = {};
        if(clientRequest.includes('yeshurn')) {
            response.yeshurn =  shul.getTimes(values[index]);
        }
        if(clientRequest.includes('mikor')) {
            response.mikor =  shul.getTimes(values[index]);
        }
        if(clientRequest.includes('chodorov')) {
            response.chodorov =  shul.getTimes(values[index]);
        }
        if(clientRequest.includes('agudah')) {
            response.agudah =  shul.getTimes(values[index]);
        }
        res.send(JSON.stringify(response, null, 2));
    });
});


app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('Example app listening on port ' + app.get('port') );
});