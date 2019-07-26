function Obj(maxSpeed, curveSpeed){
  this.maxSpeed = maxSpeed;
  this.curveSpeed = curveSpeed;
  this.name = name || "";
  this.reset = function(){
    this.maxSpeed = "";
    this.curveSpeed = "";
    this.name = "";
  }
}

function Track(straightDistance, curveDistance){
  this.straightDistance = straightDistance;
  this.curveDistance = curveDistance;
  this.reset = function(){
    this.straightDistance = "";
    this.curveDistance = "";
  }
  this.calculateTime = function(obj) {
      var straightTime = this.straightDistance / obj.maxSpeed;
      var curveTime = this.curveDistance/ obj.curveSpeed;
      var totalTime = straightTime + curveTime;
      return totalTime;
  }
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

function App(){
  this.init = function() {
    this.track = new Track();
    this.car1 = new Obj();
    this.car2 = new Obj();
    this.addListeners();
  }
  
  this.selectors = {
    $raceButton: document.querySelector("#race"),
    $newRaceButton: document.querySelector(".new-race"),
    $input: document.querySelectorAll("input[type='text']"),
    $winner: document.querySelector("#winner-box"),
    $straightDistanceInput: document.querySelector("#straight-distance"),
    $curveDistanceInput: document.querySelector("#curve-distance")
  }  
  
  this.addListeners = function(){
    // Configure the cars
    this.addCarListeners(this.car1, document.querySelector("#max-speed1"), document.querySelector("#curve-speed1"), document.querySelector("#name1"));
    this.addCarListeners(this.car2, document.querySelector("#max-speed2"), document.querySelector("#curve-speed2"), document.querySelector("#name2"));
    
    // Configure the track
    this.selectors.$straightDistanceInput.addEventListener("change", function(){
      this.track.straightDistance = Number(this.selectors.$straightDistanceInput.value);
    }.bind(this));
    this.selectors.$curveDistanceInput.addEventListener("change", function(){
      this.track.curveDistance = Number(this.selectors.$curveDistanceInput.value);
    }.bind(this));
    
    // Race cars and display the winner
    this.selectors.$raceButton.addEventListener("click", function(){
      var winner = this.track.race(this.car1, this.car2);
      if (!winner) {
        this.selectors.$winner.innerHTML = "It's a tie!";
      } else {
        this.selectors.$winner.innerHTML = "And the winner is... " + winner.name + "!";
      }
      this.selectors.$newRaceButton.classList.add("reveal");
    }.bind(this));
    
    // Reset and race again with a new race
    this.selectors.$newRaceButton.addEventListener("click", function(){
      this.car1.reset();
      this.car2.reset();
      this.track.reset();
      this.selectors.$input.forEach(function(i){
        i.value = "";
      });
      this.selectors.$winner.innerHTML = "";
      this.selectors.$newRaceButton.classList.remove("reveal");
    }.bind(this));
  }
  
  this.addCarListeners = function (obj, $maxSpeed, $curveSpeed, $name) {
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
