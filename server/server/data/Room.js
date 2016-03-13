/**
 *
 * Created by matt on 12/03/2016.
 */

var Game = require("./Game.js");
var JE = require("./JE.js");

module.exports = function(name, postcode, emitter){
  var self = this;

  self.emitter = emitter;
  self.name = name;
  self.game = false;
  self.cuisines = false;

  JE.getRestaurants(postcode, function(err, res, body){
    self.cuisines = JE.countCuisines(body.Restaurants);
    self.emitter.emit("cuisinesLoaded", self.cuisines);
  });

  self.getVotes = function(){
    return self.game.votes;
  };
  self.getOptions = function(){
    return self.cuisines;
  };
  self.addPoint = function(cuisine){
    self.game.addPoint(cuisine);
    emitter.emit("newPoint", cuisine);
  };

  self.startGame = function(){
    emitter.emit('gameStart');
    if(!self.game || self.game.timeLeft() < 0){
      self.game = new Game(self.cuisines, function(votes, cuisine){//game ended
        console.log("game ended");
        emitter.emit("gameEnded", votes, cuisine);
      });
    }
  }

};