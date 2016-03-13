/**
 *
 * Created by matt on 12/03/2016.
 */
module.exports = function(cuisines, gameEndCb){
  var self = this;

  self.votes = {};

  for (var i = 0; i < cuisines.length; i++) {
    self.votes[cuisines[i].name] = cuisines[i];
    self.votes[cuisines[i].name].numVotes = 1;
  }

  self.startTime = Date.now();
  self.gameLength = gameLength();
  console.log("Game is " + self.gameLength.toFixed(1) + "s long");
  self.endTime = self.startTime + self.gameLength;

  setTimeout(function(){
    console.log("game ended?!?!");
    var keys = Object.keys(self.votes);
    var options = new Array(keys.length);
    for (var i = 0; i < options.length; i++)
      options[i] = self.votes[keys[i]];

    var winner = getRandomResult(cuisines);

    gameEndCb(options, winner);
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

function getRandomResult(cuisines){
  var sum = 0;
  for(var i = 0; i < cuisines.length; i++){
    sum += cuisines[i].numVotes;
  }

  var position = Math.random()*sum;

  var tempSum = 0;
  for(var i = 0; i < cuisines.length; i++){
    tempSum += cuisines[i].numVotes;
    if(tempSum > position) return cuisines[i].name;
  }
  return "error";
}