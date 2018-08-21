function getEventType(object) {
    return object.name.trim();
}
function appendEvent(shulname, object) {
    // <span class="badge badge-pill badge-danger">Cutting it close</span>
    // <p class="card black">
    //     <img class="logo" src="/images/yeshurn_logo.jpg" alt="">Shacharis: 6:15a
    // </p>

    var eventTime = object.time.replace(/ /g, '').replace(':', '').replace('p', 'pm').replace('a', 'am');
    var eventLiveStatus= eventStatus(eventTime);
    
    var wrapper = document.createElement('div');
        wrapper.className = 'fadeanimiation';

    var span = document.createElement('span');
        span.className = "badge badge-pill badge-"+ eventLiveStatus.split(':')[0];
        span.innerHTML = eventLiveStatus.split(':')[1];
    var paragraph = document.createElement('p');
        paragraph.className = "card black";
    var imageLogo = document.createElement('img');
        imageLogo.src = shulname + '.jpg';
        imageLogo.className = 'logo';
    paragraph.appendChild(imageLogo);
    paragraph.innerHTML += object.name + object.time;
    

    wrapper.appendChild(span);
    wrapper.appendChild(paragraph);
    return wrapper;
    
}
function convertTo24Hour(time) {
    var hours = parseInt(time.substr(0, 2));
    console.log(hours);
    if(time.indexOf('am') != -1 && hours == 12) {
        time = time.replace('12', '0');
    }
    if(time.indexOf('pm')  != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
    }
    return time.replace(/(am|pm)/, '');
}

function generateEventTypes(data) {
    var list = document.querySelector('.list');
    var result = [], i = 0;
    for (var key in data) {
        for(i = 0; i < data[key].length; i++) {
            if(!result.includes(data[key][i].name.trim())) {
                result.push(data[key][i].name.trim());
            }
        }
    }
    for(i = 0; i < result.length; i++) {
        var title = document.createElement('div');
            title.className = 'title';
        var type = document.createElement('h2');
            type.innerHTML = result[i];
        title.appendChild(type);
        list.appendChild(title);
    }
    // return result;
}

function getCurrentTime() {
    var currentDay = new Date();
    var time = currentDay.getHours() + ":" + currentDay.getMinutes();

    return time;
}

function eventStatus(time) {
    var currentTime = getCurrentTime();
    time = convertTo24Hour(time);
    

    if(parseInt(time.split(':')[0]) > parseInt(currentTime.split(':')[0])) {
        console.log('your on time');
        return "primary:On Time";
    }
    else {
        return "danger:missed";
    }
}

function generateEventAndTimes(list) {
    var domLIST = document.querySelector('.list');
    generateEventTypes(list);
    for (var key in list) {
        for(var i = 0; i < list[key].length; i++) {
            // debugger;
            var evtType = list[key][i].name.trim();
            var listToInject = document.querySelectorAll('div.title');
            listToInject = jQuery(listToInject).filter(function(index, element) {
                return element.firstElementChild.innerHTML == evtType;
            });
            jQuery(listToInject).append(appendEvent(key,list[key][i]));
            // domLIST.appendChild(appendEvent(key,list[key][i]));
        }
    }
}
// generateEventAndTimes();
