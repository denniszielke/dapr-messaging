var apiUrl = '/api/';
function loopClick() {
    console.log(document.getElementById('PublishMessage'));
    document.getElementById('PublishMessage').click();
};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
angular.module('SimulatorApp', [])
    .controller('SimulatorController',
        function ($scope, $http) {

            $scope.Init = function () {
                var postUrl = apiUrl + 'getname';
                var config = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                };
                $http.post(postUrl, { 'getname': status }, config)
                    .success(function (response) { 
                        $scope.name = response;
                        $scope.message = 'hi from ' + response;
                        $scope.humidity = 20;
                        $scope.temperature = 15;
                        console.log("received response:");
                        console.log(response);
                        
                        var postUrl = apiUrl + 'newdevice';
                        var config = {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',                                
                            }
                        };
                        $http.post(postUrl, { 'name': $scope.name }, config)
                            .success(function (response) { 
                                console.log("received response:");
                                console.log(response);
                                $scope.result = "Connected";
                            });
                    });       
            };

            $scope.Stats = function () {
                var postUrl = apiUrl + 'getversion';
                var config = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                };
                $http.get(postUrl, { 'getname': status }, config)
                    .success(function (response) { 
                        $scope.version = response;
                        console.log("received version:");
                        console.log(response);
                    });       
            };

            $scope.InvokeRequest = function () {
                var postUrl = apiUrl + 'invokerequest';
                var uid = uuidv4();
                var config = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Ce-Specversion': '1.0',
                        'Ce-Type': 'dapr-demo',
                        'Ce-Source' : 'message-creator',
                        'Ce-Id': "'" + uid + "'",
                        'id': "'" + uid + "'",
                        'temperature': "'" + $scope.temperature + "'",
                        'humidity': "'"+ $scope.humidity + "'",
                        'name':"'"+  $scope.name + "'",
                        'message': "'"+ $scope.message + "'"
                    }
                };
                var body = {
                    'id': "'" + uid + "'",
                    'temperature': "'" + $scope.temperature + "'",
                    'humidity': "'"+ $scope.humidity + "'",
                    'name':"'"+  $scope.name + "'",
                    'message': "'"+ $scope.message + "'"
                }
                console.log(config.headers);
                $http.post(postUrl, body, config)
                    .success(function (response) { 
                        $scope.result = response;
                        console.log("received response:");
                        console.log(response);  
                        if ($scope.loop){
                            window.setTimeout(loopClick, 500);
                        }
                    });
            };

            $scope.PublishMessage = function () {
                var postUrl = apiUrl + 'publishmessage';
                var uid = uuidv4();
                var config = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Ce-Specversion': '1.0',
                        'Ce-Type': 'dapr-demo',
                        'Ce-Source' : 'message-creator',
                        'Ce-Id': "'" + uid + "'",
                        'id': "'" + uid + "'",
                        'temperature': "'" + $scope.temperature + "'",
                        'humidity': "'"+ $scope.humidity + "'",
                        'name':"'"+  $scope.name + "'",
                        'message': "'"+ $scope.message + "'"
                    }
                };

                var body = {
                    'id': "'" + uid + "'",
                    'temperature': "'" + $scope.temperature + "'",
                    'humidity': "'"+ $scope.humidity + "'",
                    'name':"'"+  $scope.name + "'",
                    'message': "'"+ $scope.message + "'"
                }
                console.log(config.headers);
                $http.post(postUrl, body, config)
                    .success(function (response) { 
                        $scope.result = response;
                        console.log("received response:");
                        console.log(response);  
                        if ($scope.loop){
                            var randum = Math.floor((Math.random() * 5) + 1);
                            var randtm = Math.floor((Math.random() * 5) + 1);
                            if ($scope.humidity > 50 || $scope.humidity < 7)
                            {
                                $scope.humidity = 25;
                            }
                            if ($scope.temperature > 50 || $scope.temperature < 7)
                            {
                                $scope.temperature = 25;
                            }
                            if (randum > 3){
                                $scope.humidity += randum;
                                $scope.temperature -= randtm;
                            }
                            else{
                                $scope.humidity -= randum;
                                $scope.temperature += randtm;
                            }
                            window.setTimeout(loopClick, 500);
                        }
                    });
            };
            
            $scope.Init();
            $scope.Stats();
        }
    );