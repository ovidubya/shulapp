var request = require('request');
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
module.exports = {
    getTimes: function(html) {
        var dom = new JSDOM(html);
        var window = dom.window.document.defaultView;
        var $ = require('jquery')(window);

        var table = $('h2').filter(function(index, element) {
            return element.innerHTML == "Today's Calendar";
        }).next();
        
        
        var events = $(table).find('bdi');
        var eventsTime = $(table).find('.right_calendar_widget_time');

        var arr = [];
        for(var i = 0; i < events.length; i++) {
            var event = {
                name: events[i].innerHTML,
                time: eventsTime[i].innerHTML
            };
            arr.push(event);
        }
        return arr;
    }
};