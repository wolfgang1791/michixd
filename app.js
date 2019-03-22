
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;
var path=require('path');

app.set('views', path.join(process.cwd() + '/views'));
app.use(express.static(path.join(process.cwd() + '/public')));

app.use(express.static('public'));

app.set('view engine', 'jade');

// const myURL = new URL('https://michi-singravedad.herokuapp.com/');
// console.log(myURL.hostname);
var canal = '';

app.get('/', function(req, res){
  res.render( __dirname + '/index'); // base_url fake para heroku
});

app.get(`/tablero`, function(req, res){
  
  canal = req.query.sala;
  usuario = req.query.usuario;
 
  console.log(req);
  

  console.log(usuario);
  
  console.log(canal);
  
  res.render(__dirname + '/tablero',{sala:canal});
  // res.sendFile(__dirname + '/tablero',{sala:canal}); 
});


io.on('connection', function(socket){
  
    console.log(canal);
    
    socket.on(canal, function(usuario,msg){
      console.log(msg+" "+usuario);
      io.emit(canal,msg);
      });
});

http.listen(port, function(){
  console.log('listening on *:3001 ');
});