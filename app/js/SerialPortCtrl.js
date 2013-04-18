/* Controllers */
var serialApp = angular.module("SerialPortCtrl", []);

/* Serial Port Data Service */
serialApp.factory('SerialPortOptions', function() {
	return {
		buffer: '',
		ports: []
	};
})



function SerialPortCtrl($scope, SerialPortOptions) {

	$scope.serialPortOptions = SerialPortOptions;
	$scope.$watch( function () { return SerialPortOptions; } , function() { $scope.serialPortOptions = SerialPortOptions; }, true);
	$scope.buffer = "";


	/**
	 * Get all the serial ports.
	 */
	$scope.getPorts = function() {
    
		//Get the serialport listings
		require("serialport").list(function (err, ports) {

			// Set the response
			// Need to use $scope.$apply() because this is within
			// another function.
			// http://stackoverflow.com/questions/10179488/the-view-is-not-updated-in-angularjs
			$scope.$apply(function() { SerialPortOptions.ports = ports; });
	      
			var portInfo = "";
			ports.forEach(function (port) {
				console.log(port.comName);
				console.log(port.pnpId);
				console.log(port.manufacturer);
				
			});	
		});
	}

	/**
	 * Read data from the serial port
	 */
	$scope.readData = function() {
	
		//Initialize the serial port
		var SerialPort = require("serialport").SerialPort
		var serialPort = new SerialPort("COM14", {
		baudrate: 115200
		});

		//Open the serial data
		serialPort.open(function () {
			console.log('open');

			// Read in the data
			serialPort.on('data', function(data) {
				console.log('data received: ' + data);

				//Display the data
				// Need to use $scope.$apply() because this is within
				// another function.
				// http://stackoverflow.com/questions/10179488/the-view-is-not-updated-in-angularjs
				//$scope.$apply(function() { $scope.ReadBuffer += data; });
				//$scope.serialData += data;
				//$scope.$apply(function() { $scope.serialData += data; });
				$scope.$apply(function() { SerialPortOptions.buffer = data });
				$scope.buffer = (data + $scope.buffer).substr(0, 5000);

			});

		});
	}

}