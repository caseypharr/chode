var socket = io(); 

//handles trigger when user submts the message
function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message);
}
$('#m').val('').focus();
  return false;
}
 
 //notfies user as broadcast to all when another user is typying
function notifyTyping() { 
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}
 
 
socket.on('chatMessage', function(from, msg, userList){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
  console.log(userList);
  if(userList != undefined){
	for(var i =0;i<userList.length;i++){
		$('#users').append('<li user-item="' + userList[i] + '"><span class="glyphicon glyphicon-user"></span>' + userList[i] + '</li>');
	}
  }
});


socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});
  
//mke  random user id durring login
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
 //add on on binder to log out button so we can capture the user, then emit, and let socket just close on own.
 //redirect out of page.
 
$(document).ready(function(){
  var name = '';
  
  name = makeid();
  
  $('#user').val(name);
   
//needs to be corrected...   
//$('#users').append('<li user-item="' + user + '"><span class="glyphicon glyphicon-user"></span>' + name + '</li>');
  
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
});


function updateUserInfo(){
	var me = $('#user').val();
	$('#userInfoSpan').text('Info for: ' + me);
}
 
 socket.on('logout', function(from){
	 //var me = $('#user').val();
	 //var msg = (from == me) ? '' : 'System <b>' + from + '</b> has left the discussion';
	 //remove the spcific user from user list
	 $('#users li[user-item="' + user + '"]').remove();
  
	 var msg = 'System <b>' + from + '</b> has left the discussion';
	 $('#messages').append('<li>' + msg + '</li>');
});

function checkForUsersActive()
{
	setTimeOut(function(){}, 1000);
}

