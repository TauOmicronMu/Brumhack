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
    socket.emit("cuisinesLoaded", rooms[socket.room].getOptions());
    socket.emit("votesLoaded", rooms[socket.room].getVotes());
  });

  socket.on('createRoom', function(roomName){
    console.log("Creating room: " + roomName);
    rooms[roomName] = new Room(roomName, socket.broadcast.to(roomName));
    socket.room = roomName;
  });

  socket.on('startGame', function(postcode){
    console.log("Starting game at postcode: " + postcode);
    rooms[socket.room].startGame(postcode);
  });

  socket.on('addPoint', function(cuisine){
    console.log("Added point to: " + cuisine);
    rooms[socket.room].addPoint(cuisine);
  });
});
