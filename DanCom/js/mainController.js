app.controller('mainController', function($scope, $http) {
    $http.get('data/data.json')
        .then(function (res) {
            $scope.data = res.data;
        });
    $scope.show = 0;
    $scope.changeView = function (view) {
        $scope.show = view;
    };

    $scope.weatherDay = 0;
    function changeWeatherDay(day) {
        if(day === 0) {
            $scope.weatherDay = 0;
            $scope.weatherData ={
                city: $scope.weatherData.city,
                country: $scope.weatherData.country,
                currently: $scope.weatherData.currently,
                temp: $scope.weatherData.temp,
                high: $scope.weatherData.high,
                low: $scope.weatherData.low,
                windChill: Math.round(($scope.weatherData.wind.chill -32) * 5 / 9),
                windDirection: $scope.weatherData.wind.direction,
                windSpeed: $scope.weatherData.wind.speed +" "+ $scope.weatherData.units.speed,
                humidity: $scope.weatherData.humidity,
                image: $scope.weatherData.image
            }
        }

    }
    function getWeather() {
        $.simpleWeather({
            location: 'Tel Aviv, IL',
            woeid: '',
            unit: 'c',
            success: function (weather) {
                $scope.weatherData = weather;
                changeWeatherDay(0);
            }
        });
    }
    getWeather();
});
