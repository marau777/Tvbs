// We are using the rpio library to install it go to command prompt and type "npm install rpio"

////////////////////////////////
// Initialization Section     //
///////////////////////////////

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



// Let's blink an LED to get a feel for what a Loop does.
// This is a type of loop called a "ForNext Loop" It will only repeat the code within the curly brackets the exact number of times specified in this case 5.
console.log('Starting ForNext Loop Example1');
for (var i = 0; i < 5; i++) 
{
        /* On for 1 second */
        rpio.write(RedLED, rpio.LOW);
        rpio.sleep(1);
        
        /* Off for half a second (500ms) */
        rpio.write(RedLED, rpio.HIGH);
        rpio.msleep(500);
}
