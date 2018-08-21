var table = jQuery('h2').filter(function(index, element) {
	return element.innerHTML == "Today's Calendar";
}).next();


var event = jQuery(table).find('bdi');
var time = jQuery(table).find('.right_calendar_widget_time');