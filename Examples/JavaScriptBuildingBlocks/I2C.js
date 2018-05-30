// Create an object that points to the 'rpio' library 
var rpio = require('rpio');




// Create objects that represent pin numbers to inputs and outputs on our Raspberry PI to make our code easier to read and change.


// Inputs
var Switch1_Top = 31;
var Switch2_Left = 33;
var Switch3_Bottom = 35;
var Switch4_Right = 37;

// Define the direction of the Input pins above
rpio.open(Switch1_Top, rpio.INPUT);
rpio.open(Switch2_Left, rpio.INPUT);
rpio.open(Switch3_Bottom, rpio.INPUT);
rpio.open(Switch4_Right, rpio.INPUT);

// Outputs
var RedLED = 32;
var GreenLED = 36;
var BlueLED = 38;
var Buzzer = 40;

// Define the direction and initial state of the output pins above.
rpio.open(RedLED, rpio.OUTPUT, rpio.HIGH);
rpio.open(GreenLED, rpio.OUTPUT, rpio.HIGH);
rpio.open(BlueLED, rpio.OUTPUT, rpio.HIGH);
rpio.open(Buzzer, rpio.OUTPUT, rpio.LOW);


/*
 * Magic numbers to initialise the i2c display device and write output,
 * cribbed from various python drivers.
 */
var init = new Buffer([0x03, 0x03, 0x03, 0x02, 0x28, 0x0c, 0x01, 0x06]);
var LCD_LINE1 = 0x80,
    LCD_LINE2 = 0xc0;
var LCD_ENABLE = 0x04,
    LCD_BACKLIGHT = 0x08;

/*
 * Data is written 4 bits at a time with the lower 4 bits containing the mode.
 */
function lcdwrite4(data) {
    rpio.i2cWrite(Buffer([(data | LCD_BACKLIGHT)]));
    rpio.i2cWrite(Buffer([(data | LCD_ENABLE | LCD_BACKLIGHT)]));
    rpio.i2cWrite(Buffer([((data & ~LCD_ENABLE) | LCD_BACKLIGHT)]));
}

function lcdwrite(data, mode) {
    lcdwrite4(mode | (data & 0xF0));
    lcdwrite4(mode | ((data << 4) & 0xF0));
}

/*
 * Write a string to the specified LCD line.
 */
function lineout(str, addr) {
    lcdwrite(addr, 0);

    str.split('').forEach(function(c) {
        lcdwrite(c.charCodeAt(0), 1);
    });
}

rpio.close();

var options = {
    gpiomem: false,
    /* Use /dev/gpiomem */
    mapping: 'physical',
    /* Use the P1-P40 numbering scheme */
    mock: undefined,
    /* Emulate specific hardware in mock mode */
}

rpio.init([options]);


/*
 * We can now start the program, talking to the i2c LCD at address 0x27.
 */
rpio.i2cBegin();
rpio.i2cSetSlaveAddress(0x27);
rpio.i2cSetBaudRate(10000);

for (var i = 0; i < init.length; i++)
    lcdwrite(init[i], 0);

lineout('node.js i2c LCD!', LCD_LINE1);
lineout('npm install rpio', LCD_LINE2);

rpio.i2cEnd();
