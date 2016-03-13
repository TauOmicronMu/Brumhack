/**
 * Created by matt on 12/03/2016.
 */

var socket = io.connect("http://ec2-54-187-69-193.us-west-2.compute.amazonaws.com/");
//var socket = io.connect("localhost");

socket.on('connect', function(){
  console.log('connected');
});

function createRoom(roomName, postcode){
  socket.emit("createRoom", roomName, postcode);
}

function joinRoom(roomName, gameStartCb){
  socket.emit("joinRoom", roomName);
  socket.on("gameStart", function(){
    gameStartCb();
  });
  socket.on("cuisinesLoaded", function(cuisines){
    console.log(cuisines);
    socket.off("cuisinesLoaded");
  });
}

function startGame(){
  socket.emit("startGame");
}

function joinGame(newPointCb, votesLoadedCb, gameEndedCb){
  socket.emit("joinGame");
  socket.on("newPoint", function(cuisine){
    newPointCb(cuisine);
  });
  socket.on("votesLoaded", function(votes){
    socket.off("votesLoaded");
    votesLoadedCb(votes);
  });
  socket.on("gameEnded", function(votes, cuisine){
    gameEndedCb(votes, cuisine);
    socket.off("gameEnded");
  });
}

function addPoint(cuisine){
  socket.emit("addPoint", cuisine);
}

