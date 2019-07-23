function Car(maxSpeed, curveSpeed){
  this.maxSpeed = maxSpeed;
  this.curveSpeed = curveSpeed;
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
  bothCars(car1, "#max-speed1", "#curve-speed1");
  bothCars(car2, "#max-speed2", "#curve-speed2");
}

function bothCars(car, input_a, input_b) {
  var maxSpeedInput = document.querySelector(input_a);
  maxSpeedInput.addEventListener("change", function(){
    car.maxSpeed = Number(maxSpeedInput.value);
  });
  var curveSpeedInput = document.querySelector(input_b);
  curveSpeedInput.addEventListener("change", function(){
    car.curveSpeed = Number(curveSpeedInput.value);
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
  var car1Time = calculateTime(car1);
  var car2Time = calculateTime(car2);
  var winner = Math.min(car1Time, car2Time);
  console.log(winner);
}

function race(){
  var calculate = document.querySelector("#calculate");
  calculate.addEventListener("click", function(){
      compareCars();
  });
}
