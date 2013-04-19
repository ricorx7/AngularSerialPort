/*
 * Copyright 2011, Rico Studio 
 * All rights reserved.
 * http://www.rico-studio.com
 * https://github.com/ricorx7
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 *  1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *      
 *  2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *      
 *  THIS SOFTWARE IS PROVIDED BY Rico Studio ''AS IS'' AND ANY EXPRESS OR IMPLIED 
 *  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 *  FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Rico Studio OR
 *  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 *  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 *  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 *  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 *  ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *  
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Rico Studio.
 * 
 * 
 * HISTORY
 * -----------------------------------------------------------------
 * Date            Initials    Version    Comments
 * -----------------------------------------------------------------
 * 04/19/2013      RC          0.0.1           Initial coding
 * 
 */

/* Controllers */
var serialApp = angular.module("SerialPortCtrl", []);

/* Serial Port Data Service */
serialApp.factory('SerialPortOptions', function() {
	return {
		buffer: '',
		ports: []
	};
})


/*
 * Get the ports from the serial port.  And read and
 * write to the serial port.
 */
function SerialPortCtrl($scope, SerialPortOptions) {

	// Set the SerialPortOptions and monitor for any changes to the options
	$scope.serialPortOptions = SerialPortOptions;
	$scope.$watch( function () { return SerialPortOptions; } , function() { $scope.serialPortOptions = SerialPortOptions; }, true);
	
	// Buffer to store the incoming data
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
			
			// Display the port info to the console
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
		var serialPort = new SerialPort("COM14", { baudrate: 115200 });

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