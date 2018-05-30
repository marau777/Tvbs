// The requirements of our alarm system are as follows:
// 1.  Top Button will set the alarm system and turn on the RED LED.  Otherwise the Green LED will be on.
// 2.  Left Button will trigger the alarm which turns on the buzzer and flashes the RED LED.
// 3.  Bottom Button will reset the alarm and return to the Green LED state.
// 4.  Right Button will exit the program.


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
rpio.open(Switch1_Top, rpio.INPUT, rpio.PULL_UP);
rpio.open(Switch2_Left, rpio.INPUT, rpio.PULL_UP);
rpio.open(Switch3_Bottom, rpio.INPUT, rpio.PULL_UP);
rpio.open(Switch4_Right, rpio.INPUT, rpio.PULL_UP);

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

//
// Here is where we star our program.
//

// First we turn all the LED's  and Buzzer off.  Every program starts with initialization steps.
rpio.write(RedLED, rpio.HIGH);
rpio.write(GreenLED, rpio.HIGH);
rpio.write(BlueLED, rpio.HIGH);
rpio.write(Buzzer, rpio.LOW);

// Let's create and initialize some variables that we will use to set the state of our program
// and make our program easier to design and read.
var CurrentState = "Idle";
var ContinueProgram = true;

// Next we start a Loop to run our program over and over in.  Everything inside the curly backets will run continuously
// as long as the right button is not pressed.
while (ContinueProgram) {



    if (CurrentState == "Idle") {
        rpio.write(GreenLED, rpio.LOW);
        rpio.write(RedLED, rpio.HIGH);
        rpio.write(Buzzer, rpio.LOW);
        if (rpio.read(Switch1_Top) == rpio.LOW) CurrentState = "Armed";
        rpio.msleep(100);
    }
    else if (CurrentState == "Armed") {
        rpio.write(GreenLED, rpio.HIGH);
        rpio.write(RedLED, rpio.LOW);
        rpio.write(Buzzer, rpio.LOW);
        if (rpio.read(Switch2_Left) == rpio.LOW) CurrentState = "Triggered";
        rpio.msleep(100);
    }
    else if (CurrentState == "Triggered") {
        rpio.write(GreenLED, rpio.HIGH);
        rpio.write(RedLED, rpio.LOW);
        rpio.write(Buzzer, rpio.HIGH);
        if (rpio.read(Switch3_Bottom) == rpio.LOW) CurrentState = "Idle";
        rpio.msleep(100);
    }
    else
        break;



    if (rpio.read(Switch4_Right) == rpio.LOW)
        ContinueProgram = false;
    else
        ContinueProgram = true;

}
