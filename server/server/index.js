// Setup basic express server
var express = require('express');
var app = express();
var http = require('http');
http.globalAgent.maxSockets = 1000;
var server = http.createServer(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var port = process.env.PORT || 80;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "10000000"}));

// Game
var Room = require('./data/Room.js');

var rooms = {};
var users = {};

io.on('connection', function(socket){
  socket.room = false;

  socket.on('joinRoom', function(roomName){
    var err;
    if(rooms[roomName]){
      socket.join(roomName);
      console.log(socket.room);
      socket.emit("cuisinesLoaded", rooms[roomName].getOptions());
      console.log("Joined room: " + roomName);
    }
    /*
    else err = "Create " + roomName + " first";

    socket.emit('joinedRoom', {
      room: roomName,
      err: err ? err : false
    });
    */
  });

  socket.on("joinGame", function(){
    console.log("Joining game");
    socket.emit("votesLoaded", rooms[socket.room].getVotes());
  });

  socket.on('createRoom', function(roomName, postcode){
    console.log("Creating room: " + roomName);
    rooms[roomName] = new Room(roomName, postcode, socket.broadcast.to(roomName));
    socket.room = roomName;
  });

  socket.on('startGame', function(){
    console.log("Starting game");
    rooms[socket.room].startGame();
  });

  socket.on('addPoint', function(cuisine){
    console.log("Added point to: " + cuisine);
    rooms[socket.room].addPoint(cuisine);
  });
});
