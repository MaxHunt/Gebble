/**
 * Welcome to Gebble.js!
 *
 * Gesture Detection Libray
 * By Max Hunt - 609556
 * Date - 15/01/2015
 */

//Gestures
var shake = [[{x:3000,y:3000,z:3000,name:"shake"},{x:100,y:100,z:100}],[{x:3000,y:3000,z:3000},{x:100,y:100,z:100}],[{x:3000,y:3000,z:3000},{x:100,y:100,z:100}]];//,[{x:3000,y:3000,z:3000},{x:100,y:100,z:100}]];
var shakeX =[[{x:4000,y:4000,z:4000,name:"shakeX"},{x:1100,y:0,z:0}]];
var shakeY =[[{x:4000,y:4000,z:4000,name:"shakeY"},{x:0,y:1100,z:0}]];
var shakeZ =[[{x:4000,y:4000,z:4000,name:"shakeZ"},{x:0,y:0,z:1100}]];
//var twist = [[{x:null,y:null,z:null},{x:80,y:550,z:80}],[{x:null,y:null,z:null},{x:60,y:550,z:80}]];
var xMove = [[{x:1000,y:100,z:100,name:"XMove"},{x:150,y:0,z:0}],[{x:1000,y:100,z:100},{x:150,y:0,z:0}],[{x:1000,y:100,z:100},{x:150,y:0,z:0}]];//,[{x:1000,y:100,z:100},{x:150,y:0,z:0}]];
var yMove = [[{x:100,y:1000,z:100,name:"YMove"},{x:0,y:150,z:0}],[{x:100,y:1000,z:100},{x:0,y:150,z:0}],[{x:100,y:1000,z:100},{x:0,y:150,z:0}]];//,[{x:100,y:1000,z:100},{x:0,y:150,z:0}]];
var zMove = [[{x:100,y:100,z:1000,name:"ZMove"},{x:20,y:20,z:150}],[{x:50,y:50,z:1000},{x:30,y:30,z:150}],[{x:80,y:80,z:1000},{x:30,y:30,z:150}]];//,[{x:80,y:80,z:1000},{x:30,y:30,z:150}]];
//Array of gestures, sorted by priority
var gesture = [shake,shakeX,shakeY,shakeZ,xMove,yMove,zMove];
var timeOfFrame = 0;
var defaultTimeDifference = 3000;
var defaultDebug = true;
var options = null;
//intialise AcellerometerLibary
var Accel = require('ui/accel');

//Create Libary Object
function init(opts){
   options = opts || {}; 
   options.debug = opts.debug || defaultDebug;
   options.delay = opts.delay || defaultTimeDifference;
   options.gestures = opts.gestures || gesture;
}

//Get Values for Acelerometer
function startDetection(e){
   var frameArray = [];
   frameArray = arrayToFrames(e);
   if (timeOfFrame===0||frameArray[0][0].time - timeOfFrame >= options.delay){
      var detection = detectGesture(frameArray);
      //frame of dectection
      if (detection[0]===true){
         if(options.debug){console.log(JSON.stringify(frameArray));}
      }
         Accel.config({subscribe: true}); 
         return(detection);   
      } 
   else{
      if(options.debug){console.log("On time out");}
      return[false,-1];
   }    
}

//Convert the arrays into frames, so they can be processed
function arrayToFrames(e){
   var frameArray = [];
   for ( var i=0; i<e.accels.length-1; i++){
      frameArray.push([e.accels[i],e.accels[i+1]]);
   }
   return (frameArray);
}

//function/algorithm that detects the gestures
function detectGesture(frameArray){ 
   for (var i=0, framelength = frameArray.length-1;  i<framelength; i++){
      if ((frameArray[i][0].vibe === true)||(frameArray[i][0].vibe === true)){
         if(options.debug){console.log("frame " + i + "failed" );}
      }
      else{
         //console.log("else");
         for(var k=0, overall = options.gestures.length-1; k <= overall; k++){
            for (var j=0, len = (options.gestures[k]).length-1; j <= len; j++){
               if (((Math.abs(frameArray[i+j][1].z-frameArray[i][0].z)>=options.gestures[k][j][1].z)&&
                (Math.abs(frameArray[i+j][1].y-frameArray[i+j][0].y)>=options.gestures[k][j][1].y)&&
                (Math.abs(frameArray[i+j][1].x-frameArray[i+j][0].x)>=options.gestures[k][j][1].x))&&
                ((Math.abs(frameArray[i+j][0].z-frameArray[i+j][0].z)<=options.gestures[k][j][0].z)&&
                (Math.abs(frameArray[i+j][0].y-frameArray[i+j][0].y)<=options.gestures[k][j][0].y)&&
                (Math.abs(frameArray[i+j][0].x-frameArray[i+j][0].x)<=options.gestures[k][j][0].x))){
                  if (len === j){
                     if(options.debug){console.log("Last Dectection Frame: "+(i+j) );}
                     if(options.debug){console.log("Gesture Frame: "+j);}
                     if(options.debug){console.log("Detection on: " +options.gestures[k][0][0].name);}
                     Accel.config({subscribe: false});                  
                     //setTimeout(function() {return function () {Accel.config({subscribe: true});};}, 10000);                     
                     timeOfFrame = frameArray[i][0].time;
                     return [true,k];
                  }
                  else{
                     if(options.debug){console.log("Frame: "+(i+j) );}
                     if(options.debug){console.log("Gesture Frame: "+j);}
                  }
               }
               else{
                  i=i+j;
                  break;
               }
            }
         }
      }      
   }
   return [false,-1] ;  
}
module.exports = {
   init: init,
   start: startDetection,
   arrayToFrames: arrayToFrames,
   detect: detectGesture   
};