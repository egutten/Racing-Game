function Obj(maxSpeed, curveSpeed){
  this.maxSpeed = maxSpeed;
  this.curveSpeed = curveSpeed;
  this.name = name;
}

function Track(straightDistance, curveDistance){
  this.straightDistance = straightDistance;
  this.curveDistance = curveDistance;
  this.race = function race(obj1, obj2){
    var race = document.querySelector("#race");
    race.addEventListener("click", function(){
        compareObj(obj1, obj2);
        document.querySelector(".new-race").classList.add("reveal");
    });
  };
  this.newRace = function newRace(obj1, obj2) {
    var newRace = document.querySelector(".new-race");
    var input = document.querySelectorAll("input[type='text']");
    newRace.addEventListener("click", function(){
      resetObj(obj1, obj2);
      resetTrack();
      input.forEach (function(i){
        i.value = "";
      });
      document.querySelector("#winner-box").innerHTML = "";
      newRace.classList.remove("reveal");
    });
  };
}

var track = new Track();
var car1 = new Obj();
var car2 = new Obj();

objConfig(car1, car2);
trackConfig();
track.race(car1, car2);
track.newRace(car1, car2);

// Setting the obj's specks based on what the user enters into the inputs
function objSet(obj, input_a, input_b, input_c) {
  var maxSpeedInput = document.querySelector(input_a);
  maxSpeedInput.addEventListener("change", function(){
    obj.maxSpeed = Number(maxSpeedInput.value);
  });
  var curveSpeedInput = document.querySelector(input_b);
  curveSpeedInput.addEventListener("change", function(){
    obj.curveSpeed = Number(curveSpeedInput.value);
  });
  var nameInput = document.querySelector(input_c);
  nameInput.addEventListener("change", function(){
    obj.name = nameInput.value;
  });
}

function objConfig(obj1, obj2){
  objSet(obj1, "#max-speed1", "#curve-speed1", "#name1");
  objSet(obj2, "#max-speed2", "#curve-speed2", "#name2");
}

// Setting the track's specs based on what the user enters into the inputs
function trackConfig(){
  var straightDistanceInput = document.querySelector("#straight-distance");
  straightDistanceInput.addEventListener("change", function(){
    track.straightDistance = Number(straightDistanceInput.value);
  });
  var curveDistanceInput = document.querySelector("#curve-distance");
  curveDistanceInput.addEventListener("change", function(){
    track.curveDistance = Number(curveDistanceInput.value);
  });
}

// Determine how long it takes each obj to travel the track based on specs
function calculateTime(obj){
    var straightTime = track.straightDistance / obj.maxSpeed;
    var curveTime = track.curveDistance/ obj.curveSpeed;
    var totalTime = straightTime + curveTime;
    return totalTime;
}

// Compare the results of each obj against each other and generate a winner banner
function compareObj(obj1, obj2){
  var winnerBox = document.querySelector("#winner-box")
  var obj1Time = calculateTime(obj1);
  var obj2Time = calculateTime(obj2);
  console.log(obj1Time, obj2Time);
  if (obj1Time && obj2Time && obj1Time === obj2Time) {
    winnerBox.innerHTML = "It's a tie!";
  } else if (obj1Time && obj2Time && Math.min(obj1Time, obj2Time) === obj1Time) {
    winnerBox.innerHTML = "And the winner is... " + obj1.name + "!";
  } else if (obj1Time && obj2Time && Math.min(obj1Time, obj2Time) === obj2Time) {
    winnerBox.innerHTML = "And the winner is... " + obj2.name + "!";
  } 
}

// Reset functions
function resetObj(obj1, obj2){
  obj1.maxSpeed = "";
  obj1.curveSpeed = "";
  obj1.name = "";
  obj2.maxSpeed = "";
  obj2.curveSpeed = "";
  obj2.name = "";
}

function resetTrack(){
  track.straightDistance = "";
  track.curveDistance = "";
}
