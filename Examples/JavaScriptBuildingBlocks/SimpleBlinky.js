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

Blinky(RedLED);
Blinky(GreenLED);
Blinky(BlueLED);
Blinky(RedLED);
Blinky(GreenLED);
Blinky(BlueLED);
   

// We declare a function that encapsulates the code for blinky and we can repeatedly call that function "above" to blink the LED;
// The number of times we want.
// Functions allow us to re-use common code or common "functions" that we perform
//   We can also pass parameters into the function to control its behavior like this.   A parameter is simply a object with a value and we use that value within the function.
// For instance say we want to write a general purpose function to blink the LED once but we want to select different LEDs.  We could write a function like that shown below
// where we pass the LED in that we want to blink.  Way cool.
function Blinky(LED)
{
        /* On for 1 second */
        rpio.write(LED, rpio.LOW);
        rpio.sleep(1);
        
        /* Off for half a second (500ms) */
        rpio.write(LED, rpio.HIGH);
        rpio.msleep(500);
}

