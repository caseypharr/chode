var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var usersConnected = []; //array off curent users 
 
// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '../myapp', 'index.html'));
});
 
// Register events on socket connection
io.on('connection', function(socket){ 
  socket.id = from || Math.floor(Math.random() * 1000);
  usersConnected.push(socket.id);
  socket.on('chatMessage', function(from, msg, usersConnected){
	console.log("Connection created for socket id" + socket.id);
	io.emit('chatMessage', from, msg);
  });
  
	socket.on('disconnect', function(){	
		for( var i = 0;i < usersConnected.length; i++){
			if(usersConnected[i] == socket.id){
				usersConnected.splice(i, 1); //remove this one item from array
			}
		}	
		io.emit('logout', socket.id);
		
	});
	
	
 
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});



 
// Listen application request on port 3000
http.listen(3113, function(){
  console.log('listening on *:3113');
});

//add to write log file for day timestamp as file name every chatMessagefs = require('fs');
//fs = require('fs');
//fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
//  if (err) return console.log(err);
//  console.log('Hello World > helloworld.txt');
//});
