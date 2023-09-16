const path = require('path');
const http = require('http');
const express= require('express');
const socketio = require('socket.io');

const app= express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

//run when client connects
io.on('connection', socket => {

    socket.emit('message', "Welcome to chatbox");


// to boardcast when user connects

 socket.broadcast.emit('message', 'A user has joined the chat');

 // when user disconnects

 socket.on('disconnect',()=>{
    io.emit('message','A user has left the chat')
 })

 //listen chatmessage
 socket.on('chatmessage', (msg)=>{
    io.emit('message',msg);


 })
})

const PORT=4000;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
