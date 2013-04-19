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

/*
 * Write Serial Port data to a file.
 * This will watch the buffer for changes.
 * If any data is received, the data will be
 * written to a file.
 */
angular.module("SerialPortWriterCtrl", []);
  

/*
 * Write Serial Port data to a file.
 * This will watch the buffer for changes.
 * If any data is received, the data will be
 * written to a file.
 * Currently this is an unbuffered write.
 */
function SerialPortWriterCtrl($scope, SerialPortOptions) {
	// Filepath to write the file
	$scope.folderPath = "C:\\RTI_Node_Capture\\";
	$scope.fileName = 'test.bin';

	// Monitor the buffer in SerialPortOptions for any changes.
	// When the buffer from the serial port changes
	// this will also set any updates received from the serialport buffer
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