function Car(maxSpeed, curveSpeed){
  this.maxSpeed = maxSpeed;
  this.curveSpeed = curveSpeed;
}

function Track(straightDistance, curveDistance){
  this.straightDistance = straightDistance;
  this.curveDistance = curveDistance;
}

var track = new Track();
var car = new Car();

carConfig();
trackConfig();
calculateTime();

function carConfig(){
  var maxSpeedInput = document.querySelector("#max-speed");
  maxSpeedInput.addEventListener("change", function(){
    car.maxSpeed = Number(maxSpeedInput.value);
  });
  var curveSpeedInput = document.querySelector("#curve-speed");
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

function calculateTime(){
  var calculate = document.querySelector("#calculate");
  calculate.addEventListener("click", function(){
    var straightTime = track.straightDistance / car.maxSpeed;
    var curveTime = track.curveDistance/ car.curveSpeed;
    var totalTime = straightTime + curveTime;
    console.log (Math.round(totalTime));
  });
}
