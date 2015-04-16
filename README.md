# Gebble

##1.	Setting up Gebble.js

First of all you must add the Gebble.js library to your files in the application. Gebble.js can be found here, https://github.com/MaxHunt/Gebble. The “read me” is not required for Gebble.js to work.
Secondly, you must require Gebble.js in the files you wish to use it.

  ```javascript
  //include Gebble Library
  var Gebble = require('Gebble');
  ```

After this, you can use the Gebble.js functions. However, you must initiate the accelerometer in your application. The details for this can be seen in pebble’s documentation: http://developer.getpebble.com/docs/pebblejs/ . The optimum setting for gesture detection is 25 samples at 10Hz. This is also the setting the default gestures have been defined and tested with.

##2.Using the functions

To start use the init() function, this allows you to set options for the Gebble.js. Here is an example of how this works. They are passed as an object to the init function.

```javascript
  //gestures
  var shake = [[{x:3000,y:3000,z:3000,name:"shake"},{x:100,y:100,z:100}],[{x:3000,y:3000,z:3000},{x:100,y:100,z:100}],[{x:300  0,y:3000,z:3000},{x:100,y:100,z:100}]];//,[{x:3000,y:3000,z:3000},{x:100,y:100,z:100}]];
  var shakeX =[[{x:4000,y:4000,z:4000,name:"shakeX"},{x:1100,y:0,z:0}]];
  var shakeY =[[{x:4000,y:4000,z:4000,name:"shakeY"},{x:0,y:1100,z:0}]];
  var shakeZ =[[{x:4000,y:4000,z:4000,name:"shakeZ"},{x:0,y:0,z:1100}]];
  var gestures = [shake,shakeX,shakeY,shakeZ];
  //start APP
  var opt = {debug:true, delay:3000, gestures:gestures};
  Gebble.init(opt);
```
“Debug” allows the output of messages in the console telling you when detection has been made, among other useful information. Can be true or false
“Delay” is the amount of time another gesture can be detected from a previous positive detection, the cool down time if you will. The 3000 value above represents 3 seconds. An integer.
“Gestures” is the array of gestures you wish to detect. In the example, there are 4 different gestures. The order in the array denotes the priority of the gesture. If first, this gesture compared first and so on.

The gesture format is that of an array. Within the array are number of frames, also each an array. These frames contain 2 objects, each with 3 variables, excluding the first object in the array, which contains a name field. 

The 2 objects contain upper and lower tolerances for comparison to the measurements coming into the algorithm. The maximum is 4000 and minimum 0 as they differences are calculated absolutely. The tolerance is compared to the difference of a frame on the measurement side. For example if x1-x2 > g1 this is evaluated to true.

All these options have default values. “Gesture” defaults to a shake, X Movement, Y Movement and Z movement, “Delay” to 3000 and Debug to “true” if no input is found.

In order to use Gebble.detect(), you must supply it with the event given to you by the accelerometer. An example below.
```javascript
  var detection = Gebble.detect(e);
```
The response will be either true or false, depending on whether a gesture is detected in that event. You will also receive an integer relating to the position of the gesture in the array supplied of the default array, as explained above. If the detection was false, this number will be -1.

##3.	Example Project

An example project using Gebble.js is here https://github.com/MaxHunt/StarWarsGen.

This is also the project the above snippets of code were taken from. This project was adapted from https://github.com/dcgauld/starwars.

Any other questions, please feel free to tweet me @MaxHnt, or contact me on Github.
