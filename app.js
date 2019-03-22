
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

var jugadores = [];

app.get('/', function(req, res){
  res.render( __dirname + '/index'); // base_url fake para heroku
});

app.get('/armas',(req,res)=>{
  
  canal = req.query.sala;
  usuario = req.query.usuario;
  // arma = req.query.arma;
  var userid = id(100);
  
  // console.log(req);
  

  console.log(usuario);
  
  console.log(canal);

  

  if(usuario != null){
    jugadores.push({ 'id': userid,'user':usuario});
  }

  

  if(jugadores[0].arma != null){
      if(jugadores[0].arma == 'x'){
        jugadores[1].arma = 'o';
      }
      else if(jugadores[0].arma == 'o'){
        jugadores[1].arma = 'x';
      }
      console.log(jugadores);
      res.render(__dirname + '/tablero',{sala:canal,jugador1:jugadores[0].user,jugador2:jugadores[1].user,usuario:usuario});
  }
  else{
    console.log(jugadores);
    res.render(__dirname + '/armas',{id:userid});
  }
});

app.get(`/tablero`, function(req, res){
  
   arma = req.query.arma;

   jugadores[0].arma = arma;

   console.log(jugadores);
  
    console.log('usaurio '+usuario);
    
   res.render(__dirname + '/tablero',{sala:canal,jugador1:jugadores[0].user,jugador2:jugadores[1].user,usuario:usuario});

});


io.on('connection', function(socket){
  
    console.log(canal);
    
    socket.on(canal, function(usuario,msg){

      


      console.log(usuario+" "+msg);
        io.emit(canal,msg,jugadores,usuario);
    
      });
});

http.listen(port, function(){
  console.log('listening on *:3001 ');
});

var id = (par) =>{
  return Math.round(Math.random()*par);
}

// var turno_ = (jugadores,user) => {
//   var temp = '';
//   var index = -1;
//   for (let i = 0; i < jugadores.length; i++) {
       
//        if(user == jugadores[i].user){
//            index = i;
//        }
//       c("i "+i);
//       }  
          
//       if( index == 0){
//           temp = jugadores[1].user;
//       }
//       else if( index == 1){
//           temp = jugadores[0].user;
//       }
              
//       return temp;
// }