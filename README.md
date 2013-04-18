#AngularSerialPort
Application that use Angular for the front-end and Node-webkit to make a back-end that functions like an executable.
You will need to download [ndoe-webkit](https://github.com/rogerwang/node-webkit) to run the application.

###To run the application
	nw.exe app\

###You will need to build the node SerialPort module for node-webkit for your platform
	cd app\node-modules\serialport
	nw-gyp configure --target=0.4.2
	nw-gyp build

###Install Node-Webkit
	install python 2.7
	npm install node-webkit
	npm install -g nw-gyp

###Other Node Modules
	npm install bindings
	npm install async