// Create an object that points to the 'rpio' library 
var rpio = require('rpio');

/*
 * Magic numbers to initialise the i2c display device and write output,
 * cribbed from various python drivers.
 */


/*
 * We can now start the program, talking to the i2c LCD at address 0x27.
 */
rpio.i2cBegin();
rpio.i2cSetSlaveAddress(0x48);
rpio.i2cSetBaudRate(10000);


var rxbuf = new Buffer(32);

var txbuf = new Buffer([0x0]);
rpio.i2cWrite(txbuf);
rpio.sleep(1);
rpio.i2cRead(rxbuf, 5);
console.log('Slider0 %d', rxbuf[0]);

var txbuf = new Buffer([0x1]);
rpio.i2cWrite(txbuf);
rpio.sleep(1);
rpio.i2cRead(rxbuf, 5);
console.log('Slider1 %d', rxbuf[0]);

var txbuf = new Buffer([0x2]);
rpio.i2cWrite(txbuf);
rpio.sleep(1);
rpio.i2cRead(rxbuf, 5);
console.log('Slider2 %d', rxbuf[0]);

rpio.i2cEnd();
