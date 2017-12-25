var dL =  new Date();
var hourL = dL.getHours();
var minuteL = dL.getMinutes();
var flag = true;
var timerL = 1000;

var weatherData ={};
getCurrentWeather();

var loopFunctionL = function() {
    timerL = 5000;
    var data = angular.element(document.getElementById('page-top')).scope().data;
    getCurrentWeather();
    if(flag === true) {
        setData2(data.charts, weatherData);
    }
    var random = Math.floor((Math.random() * data.charts.length));
    gauge3.set(weatherData.humidity);
    gauge4.set(data.charts[random].light);
    gauge5.set(data.charts[random].voltage);
    gauge6.set(data.charts[random].current);
    updateBatteryL(data.charts[random].soc, document.styleSheets[0]);
    updateTempBL(data.charts[random].temp, document.styleSheets[0]);
    updateLightTemp(weatherData.temp, document.styleSheets[0]);
    var time = new Date();
    var cur_hour = time.getHours();
    var cur_minute = time.getMinutes();
    if (minuteL !== cur_minute) {
        addMinute2(cur_hour, cur_minute, random, data.charts);
    }
    setTimeout(loopFunctionL, timerL);
};
setTimeout(loopFunctionL, timerL);




function setLabels2(chart) {
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

function setData2(data, weather) {
    flag = false;
    for(var i = 0; i < data.length; i++){
        voltChart2.data.datasets[0].data[i] = data[i].voltage;
        currChart2.data.datasets[0].data[i] = data[i].current;
        tempChart2.data.datasets[0].data[i] = data[i].temp;
        socChart2.data.datasets[0].data[i] = data[i].soc;
        lightTemp.data.datasets[0].data[i] = weather.temp -  Math.floor((Math.random() * 2));
        lightChart.data.datasets[0].data[i] = data[i].light;
        humidityChart.data.datasets[0].data[i] = weather.humidity  -  Math.floor((Math.random() * 3));

    }
    voltChart2.update();
    currChart2.update();
    tempChart2.update();
    socChart2.update();
    lightTemp.update();
    lightChart.update();
    humidityChart.update();

}

function addMinute2(cur_hour, cur_minute, random, data) {
    minuteL = cur_minute;
    if (hourL !== cur_hour) {
        hourL = cur_hour;
    }
    if (hourL < 10) {
        if (minuteL < 10) {
            voltChart2.data.labels.push("0" + hourL + ":0" + minuteL);
            currChart2.data.labels.push("0" + hourL + ":0" + minuteL);
            tempChart2.data.labels.push("0" + hourL + ":0" + minuteL);
            socChart2.data.labels.push("0" + hourL + ":0" + minuteL);
            lightTemp.data.labels.push("0" + hourL + ":0" + minuteL);
            lightChart.data.labels.push("0" + hourL + ":0" + minuteL);
            humidityChart.data.labels.push("0" + hourL + ":0" + minuteL);

        } else {
            voltChart2.data.labels.push("0" + hourL + ":" + minuteL);
            currChart2.data.labels.push("0" + hourL + ":" + minuteL);
            tempChart2.data.labels.push("0" + hourL + ":" + minuteL);
            socChart2.data.labels.push("0" + hourL + ":" + minuteL);
            lightTemp.data.labels.push("0" + hourL + ":" + minuteL);
            lightChart.data.labels.push("0" + hourL + ":" + minuteL);
            humidityChart.data.labels.push("0" + hourL + ":" + minuteL);

        }
    } else {
        if (minuteL < 10) {
            voltChart2.data.labels.push(hourL + ":0" + minuteL);
            currChart2.data.labels.push(hourL + ":0" + minuteL);
            tempChart2.data.labels.push(hourL + ":0" + minuteL);
            socChart2.data.labels.push(hourL + ":0" + minuteL);
            lightTemp.data.labels.push(hourL + ":0" + minuteL);
            lightChart.data.labels.push(hourL + ":0" + minuteL);
            humidityChart.data.labels.push(hourL + ":0" + minuteL);


        } else {
            voltChart2.data.labels.push(hourL + ":" + minuteL);
            currChart2.data.labels.push(hourL + ":" + minuteL);
            tempChart2.data.labels.push(hourL + ":" + minuteL);
            socChart2.data.labels.push(hourL + ":" + minuteL);
            lightTemp.data.labels.push(hourL + ":" + minuteL);
            lightChart.data.labels.push(hourL + ":" + minuteL);
            humidityChart.data.labels.push(hourL + ":" + minuteL);

        }
    }
    voltChart2.data.datasets[0].data.push(data[random].voltage);
    currChart2.data.datasets[0].data.push(data[random].current);
    tempChart2.data.datasets[0].data.push(data[random].temp);
    socChart2.data.datasets[0].data.push(data[random].soc);
    lightTemp.data.datasets[0].data.push(weatherData.temp);
    lightChart.data.datasets[0].data.push(data[random].light);
    humidityChart.data.datasets[0].data.push(weatherData.humidity);


    voltChart2.update();
    currChart2.update();
    tempChart2.update();
    socChart2.update();
    lightTemp.update();
    lightChart.update();
    humidityChart.update()
}

var opts3 = {
    angle: 0.5, // The span of the gauge arc
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
    colorStop: '#7FFFD4',    // just experiment with them
    strokeColor: '#EEEEEE',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true     // High resolution support
};
var target3 = document.getElementById('humidity-g'); // your canvas element
var gauge3 = new Donut(target3).setOptions(opts3); // create sexy gauge!
gauge3.maxValue = 100; // set max gauge value
gauge3.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge3.animationSpeed = 35; // set animation speed (32 is default value)
gauge3.setTextField(document.getElementById("humidity-txt"));

var opts4 = {
    angle: 0.5, // The span of the gauge arc
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
    colorStop: '#7B68EE',    // just experiment with them
    strokeColor: '#EEEEEE',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true     // High resolution support
};
var target4 = document.getElementById('light-g'); // your canvas element
var gauge4 = new Donut(target4).setOptions(opts4); // create sexy gauge!
gauge4.maxValue = 100; // set max gauge value
gauge4.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge4.animationSpeed = 35; // set animation speed (32 is default value)
gauge4.setTextField(document.getElementById("light-txt"));

var opts5 = {
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
var target5 = document.getElementById('voltage-light-g'); // your canvas element
var gauge5 = new Donut(target5).setOptions(opts5); // create sexy gauge!
gauge5.maxValue = 50; // set max gauge value
gauge5.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge5.animationSpeed = 35; // set animation speed (32 is default value)
gauge5.setTextField(document.getElementById("voltage-light-txt"),3);

var opts6 = {
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
var target6 = document.getElementById('current-light-g'); // your canvas element
var gauge6 = new Donut(target6).setOptions(opts6); // create sexy gauge!
gauge6.maxValue = 5; // set max gauge value
gauge6.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge6.animationSpeed = 35; // set animation speed (32 is default value)
gauge6.setTextField(document.getElementById("current-light-txt"),3);

var opts7 = {
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
var target7 = document.getElementById('status-light-g'); // your canvas element
var gauge7 = new Gauge(target7).setOptions(opts7); // create sexy gauge!
gauge7.maxValue = 300; // set max gauge value
gauge7.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge7.animationSpeed = 32; // set animation speed (32 is default value)
gauge7.set(50); // set actual value

function changeStylesheetRule2(s, selector, property, value) {
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


function updateLightTemp(temp, s){
    document.getElementById("lightTemp-txt").textContent=temp;
    changeStylesheetRule2(s, '.temp3', 'backgroundPosition', '0 -' + (100 - temp) + '% !important');
    changeStylesheetRule2(s, '.temp2-text', 'backgroundPosition', '0 -' + (100 - temp) + '%');
    changeStylesheetRule2(s, '.liquid', 'top', (100 - temp) + '%');
    if(temp === 100){
        changeStylesheetRule2(s, '.liquid-bg-color', 'backgroundColor', '#00fa57');
    } else {
        changeStylesheetRule2(s, '.liquid-bg-color', 'backgroundColor', '#444');
    }
}
function updateTempBL(temp, s){
    document.getElementById("temp-light-txt").textContent=temp;
    changeStylesheetRule2(s, '.temp2', 'backgroundPosition', '0 -' + (100 - temp) + '% !important');
    changeStylesheetRule2(s, '.temp2-text', 'backgroundPosition', '0 -' + (100 - temp) + '%');
    changeStylesheetRule2(s, '.liquid', 'top', (100 - temp) + '%');
    if(temp === 100){
        changeStylesheetRule2(s, '.liquid-bg-color', 'backgroundColor', '#00fa57');
    } else {
        changeStylesheetRule2(s, '.liquid-bg-color', 'backgroundColor', '#444');
    }
}

function updateBatteryL(perc, s){
    document.getElementById("soc-light-txt").textContent=perc+"%";
    changeStylesheetRule2(s, '.battery2', 'backgroundPosition', '0 -' + (100 - perc) + '% !important');
    changeStylesheetRule2(s, '.battery2-text', 'backgroundPosition', '0 -' + (100 - perc) + '%');
    changeStylesheetRule2(s, '.liquid', 'top', (100 - perc) + '%');
    if(perc === 100){
        changeStylesheetRule2(s, '.liquid-bg-color', 'backgroundColor', '#00fa57');
    } else {
        changeStylesheetRule2(s, '.liquid-bg-color', 'backgroundColor', '#444');
    }
}

$('.cube-switch .switch').click(function() {
    if ($('.cube-switch').hasClass('active')) {
        $('.cube-switch').removeClass('active');
        $('#light-bulb2').css({'opacity': '0'});
        document.getElementById("light-mode").textContent = "on";
        document.getElementById("light-mode2").textContent = "Off";

    } else {
        $('.cube-switch').addClass('active');
        $('#light-bulb2').css({'opacity': '1'});
        document.getElementById("light-mode").textContent = "off";
        document.getElementById("light-mode2").textContent = "On";
    }
});

var ctx5 = document.getElementById("voltage-light-ch").getContext('2d');
var voltChart2 = new Chart(ctx5, {
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

var ctx6 = document.getElementById("current-light-ch").getContext('2d');
var currChart2 = new Chart(ctx6, {
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
var ctx7 = document.getElementById("temp-light-ch").getContext('2d');
var tempChart2 = new Chart(ctx7, {
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
var ctx8 = document.getElementById("soc-light-ch").getContext('2d');
var socChart2 = new Chart(ctx8, {
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

var ctx9 = document.getElementById("lightTemp-ch").getContext('2d');
var lightTemp = new Chart(ctx9, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            fill: false,
            label: 'Outdoor Temperature',
            data: [],
            borderColor:'rgba(255,105,180, 1)',
            backgroundColor: 'rgba(255,105,180, 1)',
            borderWidth: 1.5
        }]
    },
    options: {
        legend: {
            display: false
        },
        layout: {
            padding: {
                left: 5
            }
        }
    }
});

var ctx10 = document.getElementById("light-ch").getContext('2d');
var lightChart = new Chart(ctx10, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            fill: false,
            label: 'Outdoor Light',
            data: [],
            borderColor:'rgba(106,90,205, 1)',
            backgroundColor: 'rgba(106,90,205, 1)',
            borderWidth: 1.5
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
});

var ctx11 = document.getElementById("humidity-ch").getContext('2d');
var humidityChart = new Chart(ctx11, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            fill: false,
            label: 'Humidity',
            data: [],
            borderColor:'rgba(64,224,208, 1)',
            backgroundColor: 'rgba(64,224,208, 1)',
            borderWidth: 1.5
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
});

setLabels2(voltChart2);
setLabels2(currChart2);
setLabels2(tempChart2);
setLabels2(socChart2);
setLabels2(lightTemp);
setLabels2(lightChart);
setLabels2(humidityChart);


//weather

function getCurrentWeather() {
    $.simpleWeather({
        location: 'Tel Aviv, IL',
        woeid: '',
        unit: 'c',
        success: function(weather) {
            weatherData = {"temp":weather.temp, "humidity":weather.humidity}
        }
    });
}

function myMap2() {
    var mapCanvas = document.getElementById("map2");
    var myCenter = new google.maps.LatLng(32.107836,34.835233);
    var mapOptions = {center: myCenter, zoom: 10};
    map = new google.maps.Map(mapCanvas,mapOptions);
    var marker = new google.maps.Marker({
        position: myCenter,
        animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);
    marker.addListener('click', function() {
        var infowindow = new google.maps.InfoWindow({
            content: "Raoul Wallenberg St 6, Tel Aviv-Yafo"
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
