var dom = new JSDOM(body);
var window = dom.window.document.defaultView;
var $ = require('jquery')(window);