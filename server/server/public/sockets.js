/**
 * Created by matt on 12/03/2016.
 */

//var socket = io.connect("http://ec2-54-187-69-193.us-west-2.compute.amazonaws.com/");
var socket = io.connect("localhost");

socket.on('connect', function(){
  console.log('connected');
});

function createRoom(roomName){
  socket.emit("createRoom", roomName);
}

function joinRoom(roomName, joinedCb){
  socket.emit("joinRoom", roomName);
}

function startGame(postcode, cuisinesLoadedCb){
  socket.emit("startGame", postcode);
  socket.on('cuisinesLoaded', function(cuisines){
    cuisinesLoadedCb(cuisines);
    socket.off("cuisinesLoaded");
  });
}

function joinGame(cuisinesLoadedCb, votesLoadedCb, gameEndedCb){
  socket.emit("joinGame");
  socket.on("cuisinesLoaded", function(cuisines){
    socket.off("cuisinesLoaded");
    cuisinesLoadedCb(cuisines);
  });
  socket.on("votesLoaded", function(votes){
    socket.off("votesLoaded");
    votesLoadedCb(votes);
  });
  socket.on("gameEnded", function(votes){
    gameEndedCb(votes);
    socket.off("gameEnded");
  });
}

function addPoint(cuisine){
  socket.emit("addPoint", cuisine);
}
