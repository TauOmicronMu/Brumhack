/**
 *
 * Created by matt on 12/03/2016.
 */
var JE = require("./JE.js");
module.exports = function(postcode, initialisedCb, gameEndCb){
  var self = this;

  JE.getRestaurants(postcode, function(err, res, body){
    self.cuisines = JE.countCuisines(body.Restaurants);
    initialisedCb(self.cuisines);
  });

  self.votes = {};

  self.startTime = Date.now();
  self.gameLength = gameLength();
  console.log("Game is " + self.gameLength.toFixed(1) + "s long");
  self.endTime = self.startTime + self.gameLength;

  setTimeout(function(){
    console.log("game ended?!?!");
    var keys = Object.keys(self.votes);
    var arr = new Array(keys.length);
    for (var i = 0; i < arr.length; i++)
      arr[i] = self.votes[keys[i]];

    gameEndCb(arr);
  }, self.gameLength);

  self.timeLeft = function(){
    return self.endTime - Date.now();
  };

  self.addPoint = function(cuisine){
    if(self.votes[cuisine]){
      self.votes[cuisine].numVotes++;
    } else {
      self.votes[cuisine] = {name: cuisine, numVotes: 1};
    }
  };
};

function gameLength(){
  // 10-20 seconds
  return 10000 + Math.random()*10000;
}