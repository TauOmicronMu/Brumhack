/**
 *
 * Created by matt on 12/03/2016.
 */

var Game = require("./Game.js");

module.exports = function(name, emitter){
  var self = this;

  self.emitter = emitter;
  self.name = name;
  self.game = false;

  self.getVotes = function(){
    return self.game.votes;
  };
  self.getOptions = function(){
    return self.game.cuisines;
  };
  self.addPoint = function(cuisine){
    self.game.addPoint(cuisine);
  };

  self.startGame = function(postcode){
    self.game = new Game(
        postcode,
        function(cuisines) {//game initialised
          console.log("game initialised");
          emitter.emit('cuisinesLoaded', cuisines);
        },
        function(votes){//game ended
          console.log("game ended");
          emitter.emit("gameEnded", votes);
        }
    );
  }
};