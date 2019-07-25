function Obj(maxSpeed, curveSpeed){
  this.maxSpeed = maxSpeed;
  this.curveSpeed = curveSpeed;
  this.name = name || ""; // default to blank name

  // Reset the car to a blank state
  this.reset = function() {
    this.maxSpeed = "";
    this.curveSpeed = "";
    this.name = "";
  };
}

function Track(straightDistance, curveDistance){
  this.straightDistance = straightDistance;
  this.curveDistance = curveDistance;

  // Reset the track to a blank state
  this.reset = function() {
    this.straightDistance = "";
    this.curveDistance = "";
  };

  // Determine how long it takes each obj to travel the track based on specs
  this.calculateTime = function(obj){
    var straightTime = this.straightDistance / obj.maxSpeed;
    var curveTime = this.curveDistance/ obj.curveSpeed;
    var totalTime = straightTime + curveTime;
    return totalTime;
  };

  // Race 2 objects and determine a winner
  this.race = function race(obj1, obj2){
    var obj1Time = this.calculateTime(obj1);
    var obj2Time = this.calculateTime(obj2);

    if (obj1Time === obj2Time) {
      return false;
    } else if (obj1Time < obj2Time) {
      return obj1;
    } else {
      return obj2;
    }
  };
}

// An App object is somewhat common to encapsulate all your functionality in an object oriented (OO) format
function App() {
  this.init = function() {
    // Initialize our app, add anything here to kick off the app on page load
    this.track = new Track();
    this.car1 = new Obj();
    this.car2 = new Obj();
    this.addListeners();
  }

  // HTML elements
  this.selectors = {
    $raceButton: document.querySelector("#race"),
    $newRaceButton: document.querySelector(".new-race"),
    $input: document.querySelectorAll("input[type='text']"),
    $straightDistanceInput: document.querySelector("#straight-distance"),
    $curveDistanceInput: document.querySelector("#curve-distance"),
    $winner: document.querySelector("#winner-box")
  };

  // Attach HTML listeners
  this.addListeners = function() {
    // There is probably a better way to loop through the cars listeners but couldn't get a good solution
    this.addCarListeners(this.car1, document.querySelector("#max-speed1"), document.querySelector("#curve-speed1"), document.querySelector("#name1"));
    this.addCarListeners(this.car2, document.querySelector("#max-speed2"), document.querySelector("#curve-speed2"), document.querySelector("#name2"));

    // Attach "race" listener
    this.selectors.$raceButton.addEventListener("click", function(){
      var winner = this.track.race(this.car1, this.car2);
      if (!winner) {
        this.selectors.$winner.innerHTML = "It's a tie!";
      } else {
        this.selectors.$winner.innerHTML = "And the winner is... " + winner.name + "!";
      }
      this.selectors.$newRaceButton.classList.add("reveal");
    }.bind(this));

    // Attach "newRace" reset listener
    this.selectors.$newRaceButton.addEventListener("click", function(){
      this.car1.reset();
      this.car2.reset();
      this.track.reset();

      this.selectors.$input.forEach (function(i){
        i.value = "";
      });
      this.selectors.$winner.innerHTML = "";
      this.selectors.$newRaceButton.classList.remove("reveal");
    }.bind(this));

    // Attach track listeners
    this.selectors.$straightDistanceInput.addEventListener("change", function(){
      this.track.straightDistance = Number(this.selectors.$straightDistanceInput.value);
    }.bind(this));

    this.selectors.$curveDistanceInput.addEventListener("change", function(){
      this.track.curveDistance = Number(this.selectors.$curveDistanceInput.value);
    }.bind(this));
  }

  this.addCarListeners = function(obj, $maxSpeed, $curveSpeed, $name) {
    $maxSpeed.addEventListener("change", function(){
      obj.maxSpeed = Number(this.value);
    });

    $curveSpeed.addEventListener("change", function(){
      obj.curveSpeed = Number(this.value);
    });

    $name.addEventListener("change", function(){
      obj.name = this.value;
    });
  }
}

var app = new App();
app.init();
