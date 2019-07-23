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

function carConfig(){
  carSet(car1, "#max-speed1", "#curve-speed1", "#name1");
  carSet(car2, "#max-speed2", "#curve-speed2", "#name2");
}

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

function calculateTime(car){
    var straightTime = track.straightDistance / car.maxSpeed;
    var curveTime = track.curveDistance/ car.curveSpeed;
    var totalTime = straightTime + curveTime;
    return Math.round(totalTime);
}

function compareCars(){
  var winnerBox = document.querySelector("#winner-box")
  var car1Time = calculateTime(car1);
  var car2Time = calculateTime(car2);
  if (Math.min(car1Time, car2Time) === car1Time) {
    winnerBox.innerHTML = "And the winner is... " + car1.name + "!";
  } else {
    winnerBox.innerHTML = "And the winner is... " + car2.name + "!";
  }
}

function race(){
  var calculate = document.querySelector("#calculate");
  calculate.addEventListener("click", function(){
      compareCars();
      
  });
}
