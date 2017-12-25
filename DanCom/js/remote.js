var map;

var d =  new Date();
var hour = d.getHours();
var minute = d.getMinutes();
var timer = 1000;

var loopFunction = function() {
    timer = 5000;
    var data = angular.element(document.getElementById('page-top')).scope().data;
    setData(data.charts);
    var random = Math.floor((Math.random() * data.charts.length));
    gauge.set(data.charts[random].voltage);
    gauge1.set(data.charts[random].current);
    updateBattery(data.charts[random].soc, document.styleSheets[0]);
    updateTemp(data.charts[random].temp, document.styleSheets[0]);
    var time = new Date();
    var cur_hour = time.getHours();
    var cur_minute = time.getMinutes();
    if (minute !== cur_minute) {
        addMinute(cur_hour, cur_minute, random, data.charts);
    }
    setTimeout(loopFunction, timer);
};
setTimeout(loopFunction, timer);

function setLabels(chart) {
    var d =  new Date();
    var hour = d.getHours();
    var minute = d.getMinutes();
    if(minute - 30 < 0){
        for(var i = 60 - (30 - minute) ; i < 60; i=i+2){
            if(i < 10) {
                if (hour - 1 < 10) {
                    chart.data.labels.push("0" + hour - 1 + ":0" + i);
                }else{
                    chart.data.labels.push(hour - 1 + ":0" + i);
                }
            }else{
                if (hour - 1 < 10) {
                    chart.data.labels.push("0" + hour - 1 + ":" + i);
                }else{
                    chart.data.labels.push(hour - 1 + ":" + i);
                }
            }
        }
        for(var i = 1; i <= minute; i=i+2){
            if(i < 10) {
                if (hour < 10) {
                    chart.data.labels.push("0" + hour + ":0" + i);
                }else{
                    chart.data.labels.push(hour + ":0" + i);
                }
            }else{
                if (hour < 10) {
                    chart.data.labels.push("0" + hour + ":" + i);
                }else{
                    chart.data.labels.push(hour + ":" + i);
                }
            }
        }

    }else {
        for(var i = minute - 30; i <=minute; i=i+2){
            if(i < 10) {
                if (hour < 10) {
                    chart.data.labels.push("0" + hour + ":0" +i);
                }else{
                    chart.data.labels.push(hour + ":0" + i);
                }
            }else{
                if (hour < 10) {
                    chart.data.labels.push("0" + hour + ":" + i);
                }else{
                    chart.data.labels.push(hour + ":" + i);
                }
            }
        }
    }
    chart.update();
}

function setData(data) {
    for(var i = 0; i < data.length; i++){
        voltChart.data.datasets[0].data[i] = data[i].voltage;
        currChart.data.datasets[0].data[i] = data[i].current;
        tempChart.data.datasets[0].data[i] = data[i].temp;
        socChart.data.datasets[0].data[i] = data[i].soc;

    }
    voltChart.update();
    currChart.update();
    tempChart.update();
    socChart.update();
}

function addMinute(cur_hour, cur_minute, random, data) {
    minute = cur_minute;
    if (hour !== cur_hour) {
        hour = cur_hour;
    }
    if (hour < 10) {
        if (minute < 10) {
            voltChart.data.labels.push("0" + hour + ":0" + minute);
            currChart.data.labels.push("0" + hour + ":0" + minute);
            tempChart.data.labels.push("0" + hour + ":0" + minute);
            socChart.data.labels.push("0" + hour + ":0" + minute);

        } else {
            voltChart.data.labels.push("0" + hour + ":" + minute);
            currChart.data.labels.push("0" + hour + ":" + minute);
            tempChart.data.labels.push("0" + hour + ":" + minute);
            socChart.data.labels.push("0" + hour + ":" + minute);
        }
    } else {
        if (minute < 10) {
            voltChart.data.labels.push(hour + ":0" + minute);
            currChart.data.labels.push(hour + ":0" + minute);
            tempChart.data.labels.push(hour + ":0" + minute);
            socChart.data.labels.push(hour + ":0" + minute);

        } else {
            voltChart.data.labels.push(hour + ":" + minute);
            currChart.data.labels.push(hour + ":" + minute);
            tempChart.data.labels.push(hour + ":" + minute);
            socChart.data.labels.push(hour + ":" + minute);
        }
    }
    voltChart.data.datasets[0].data.push(data[random].voltage);
    currChart.data.datasets[0].data.push(data[random].current);
    tempChart.data.datasets[0].data.push(data[random].temp);
    socChart.data.datasets[0].data.push(data[random].soc);

    voltChart.update();
    currChart.update();
    tempChart.update();
    socChart.update();
}






var opts = {
    angle: 0.09, // The span of the gauge arc
    lineWidth: 0.12, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#f0f8ff',   // Colors
    colorStop: '#9370db',    // just experiment with them
    strokeColor: '#EEEEEE',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true     // High resolution support
};
var target = document.getElementById('voltage-g'); // your canvas element
var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 50; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 32; // set animation speed (32 is default value)
gauge.set(0);
gauge.setTextField(document.getElementById("voltage-txt"),3);

var opts2 = {
    angle: 0.09, // The span of the gauge arc
    lineWidth: 0.12, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#f0f8ff',   // Colors
    colorStop: '#1e90ff',    // just experiment with them
    strokeColor: '#EEEEEE',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true     // High resolution support
};
var target1 = document.getElementById('current-g'); // your canvas element
var gauge1 = new Donut(target1).setOptions(opts2); // create sexy gauge!
gauge1.maxValue = 5; // set max gauge value
gauge1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge1.animationSpeed = 32; // set animation speed (32 is default value)
gauge1.set(0);
gauge1.setTextField(document.getElementById("current-txt"),3);


var optsS = {
    angle: -0.15, // The span of the gauge arc
    lineWidth: 0.21, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.51, // // Relative to gauge radius
        strokeWidth: 0.044, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    staticZones: [
        {strokeStyle: "#30B32D", min: 0, max: 100}, // Green
        {strokeStyle: "#FFDD00", min: 100, max:200 }, // Yellow
        {strokeStyle: "#F03E3E", min: 200, max: 300}  // Red
    ]
};
var targetS = document.getElementById('status-g'); // your canvas element
var gaugeS = new Gauge(targetS).setOptions(optsS); // create sexy gauge!
gaugeS.maxValue = 300; // set max gauge value
gaugeS.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gaugeS.animationSpeed = 1; // set animation speed (32 is default value)
gaugeS.set(50); // set actual value

var ctx = document.getElementById("voltage-ch").getContext('2d');
var voltChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Voltage',
            data: [],
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 1)',

            borderWidth: 1.5
        }]
    },
    options: {
        legend: {
            display: false
        },
        layout: {
            padding: {
                left: 7
            }
        }
    }
});

var ctx1 = document.getElementById("current-ch").getContext('2d');
var currChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            fill: false,
            label: 'Current',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1.5
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
});
var ctx3 = document.getElementById("temp-ch").getContext('2d');
var tempChart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature',
            data: [],
            fill: false,
            borderColor:'rgba(255,0,0,1)',
            backgroundColor: 'rgba(255,0,0,1)',
            borderWidth: 1.5
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
});
var ctx4 = document.getElementById("soc-ch").getContext('2d');
var socChart = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            fill: false,
            label: 'Battery Power',
            data: [],
            borderColor:'rgba(0, 255, 0, 1)',
            backgroundColor: 'rgba(0, 255, 0, 1)',
            borderWidth: 1.5
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
});

function changeStylesheetRule(s, selector, property, value) {
    // Make these strings lowercase
    selector = selector.toLowerCase();
    value = value.toLowerCase();

    // Delete it if it exists
    for (var i = 0; i < s.cssRules.length; i++) {
        var rule = s.cssRules[i];
        if (rule.selectorText === selector) {
            s.deleteRule(i);
            break;
        }
    }

    // Convert camelCase to hyphenated-case
    property = property.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    s.insertRule(selector + " { " + property + ": " + value + "; }", 0);
}

function updateBattery(perc, s){
    document.getElementById("soc-txt").textContent=perc+"%";
    changeStylesheetRule(s, '.battery', 'backgroundPosition', '0 -' + (100 - perc) + '% !important');
    changeStylesheetRule(s, '.battery-text', 'backgroundPosition', '0 -' + (100 - perc) + '%');
    changeStylesheetRule(s, '.liquid', 'top', (100 - perc) + '%');
    if(perc === 100){
        changeStylesheetRule(s, '.liquid-bg-color', 'backgroundColor', '#00fa57');
    } else {
        changeStylesheetRule(s, '.liquid-bg-color', 'backgroundColor', '#444');
    }
}

function updateTemp(temp, s){
    document.getElementById("temp-txt").textContent=temp;
    changeStylesheetRule(s, '.temp', 'backgroundPosition', '0 -' + (100 - temp) + '% !important');
    changeStylesheetRule(s, '.battery-text', 'backgroundPosition', '0 -' + (100 - temp) + '%');
    changeStylesheetRule(s, '.liquid', 'top', (100 - temp) + '%');
    if(temp === 100){
        changeStylesheetRule(s, '.liquid-bg-color', 'backgroundColor', '#00fa57');
    } else {
        changeStylesheetRule(s, '.liquid-bg-color', 'backgroundColor', '#444');
    }
}

setLabels(voltChart);
setLabels(currChart);
setLabels(tempChart);
setLabels(socChart);

function myMap() {
    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(52.428775, 13.535365);
    var mapOptions = {center: myCenter, zoom: 11};
    map = new google.maps.Map(mapCanvas,mapOptions);
    var marker = new google.maps.Marker({
        position: myCenter,
        animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);
    marker.addListener('click', function() {
        var infowindow = new google.maps.InfoWindow({
            content: "Max-Planck-Straße 7, Berlin"
        });
        infowindow.open(map,marker);
    });
}
history.pushState(null, null, '<?php echo $_SERVER["REQUEST_URI"]; ?>');
window.addEventListener('popstate', function(event) {
    var show = angular.element(document.getElementById('page-top')).scope().show;
    var scope = angular.element(document.getElementById('page-top')).scope();
    if(show === 2 || show === 1 || show === 3) {
        scope.$apply(function(){
            scope.show = 0;
        });
        window.location.assign("http://dancom-software.com");
    }
});