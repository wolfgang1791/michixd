// 

var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
  
    socket.on('canal', function(msg){
      console.log(msg);
      io.emit('canal',msg);
      });
});

http.listen(3001, function(){
  console.log('listening on *:3001 wea '+__dirname);
});