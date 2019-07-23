function Car(maxSpeed, curveSpeed){
  this.maxSpeed = maxSpeed;
  this.curveSpeed = curveSpeed;
  this.name = name;
}

function Track(straightDistance, curveDistance){
  this.straightDistance = straightDistance;
  this.curveDistance = curveDistance;
}

var track = new Track();
var car1 = new Car();
var car2 = new Car();

carConfig();
trackConfig();
race();
raceAgain();

// Setting the car's specks based on what the user enters into the inputs
function carSet(car, input_a, input_b, input_c) {
  var maxSpeedInput = document.querySelector(input_a);
  maxSpeedInput.addEventListener("change", function(){
    car.maxSpeed = Number(maxSpeedInput.value);
  });
  var curveSpeedInput = document.querySelector(input_b);
  curveSpeedInput.addEventListener("change", function(){
    car.curveSpeed = Number(curveSpeedInput.value);
  });
  var nameInput = document.querySelector(input_c);
  nameInput.addEventListener("change", function(){
    car.name = nameInput.value;
  });
}

function carConfig(){
  carSet(car1, "#max-speed1", "#curve-speed1", "#name1");
  carSet(car2, "#max-speed2", "#curve-speed2", "#name2");
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

// Determine how long it takes each car to travel the track based on specs
function calculateTime(car){
    var straightTime = track.straightDistance / car.maxSpeed;
    var curveTime = track.curveDistance/ car.curveSpeed;
    var totalTime = straightTime + curveTime;
    return Math.round(totalTime);
}

// Compare the results of each car against each other and generate a winner banner
function compareCars(){
  var winnerBox = document.querySelector("#winner-box")
  var car1Time = calculateTime(car1);
  var car2Time = calculateTime(car2);
  if (car1Time && car2Time && car1Time === car2Time) {
    winnerBox.innerHTML = "It's a tie!";
  } else if (car1Time && car2Time && Math.min(car1Time, car2Time) === car1Time) {
    winnerBox.innerHTML = "And the winner is... " + car1.name + "!";
  } else if (car1Time && car2Time && Math.min(car1Time, car2Time) === car2Time) {
    winnerBox.innerHTML = "And the winner is... " + car2.name + "!";
  } 
}

// Button that triggers the time calculation and comparison functions above
function race(){
  var race = document.querySelector("#race");
  race.addEventListener("click", function(){
      compareCars();
      document.querySelector(".race-again").classList.add("reveal");
  });
}

// Reset functions to start again
function resetCar(car){
  car.maxSpeed = "";
  car.curveSpeed = "";
  car.name = "";
}

function resetTrack(){
  track.straightDistance = "";
  track.curveDistance = "";
}

function raceAgain(){
  var raceAgain = document.querySelector(".race-again");
  var input = document.querySelectorAll("input[type='text']");
  raceAgain.addEventListener("click", function(){
    resetCar(car1);
    resetCar(car2);
    resetTrack();
    input.forEach (function(i){
      i.value = "";
    });
    document.querySelector("#winner-box").innerHTML = "";
    raceAgain.classList.remove("reveal");
  });
}
