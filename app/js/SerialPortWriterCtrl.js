angular.module("SerialPortWriterCtrl", []);
  

function SerialPortWriterCtrl($scope, SerialPortOptions) {
	// Filepath to write the file
	$scope.folderPath = "C:\\RTI_Node_Capture\\";
	$scope.fileName = 'test.bin';

	// Buffer from the serial port
	// This will also set any updates received from the serialport buffer
	$scope.buffer = SerialPortOptions.buffer;
	$scope.$watch( function () { return SerialPortOptions.buffer; } , 
		function() { 
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