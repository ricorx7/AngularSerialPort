'use strict';

/* Controllers */
var serialApp = angular.module("SerialPortApp", []);

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
			    $scope.ReadBuffer += "open";
		    
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


function SerialPortWriterCtrl($scope, SerialPortOptions) {
	// Filepath to write the file
	$scope.folderPath = "C:\\RTI_Node_Capture\\";
	$scope.fileName = 'test.bin';

	// Buffer from the serial port
	// This will also set any updates received from the serialport buffer
	$scope.buffer = SerialPortOptions.buffer;
	$scope.$watch( function () { return SerialPortOptions.buffer; } , function() { 
			// Set the new options
			$scope.buffer = SerialPortOptions.buffer;

			// Write the data to the file
			require('fs').appendFile($scope.folderPath + $scope.fileName, SerialPortOptions.buffer, function (err) {
				if (err) throw err;
				console.log('The "data to append" was appended to file!');
			});
		}, 
		true 
	);
}

