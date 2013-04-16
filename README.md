#AngularSerialPort
Application that use Angular for the front-end and Node-webkit to make a back-end that functions like an executable.

##You will need to build the serial port for your platform and node-webkit
	cd app\node-modules\serialport
	nw-gyp configure --target=0.4.2
	nw-gyp build

##Install Node-Webkit
	install python 2.7
	npm install node-webkit
	npm install -g nw-gyp

#Other Node Modules
	npm install bindings
	npm install async