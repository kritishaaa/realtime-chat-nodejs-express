const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')
const { joinUser, getCurrentUser } = require('./utils/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
const botname = 'ChatBot';

//run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {

        const user = joinUser(socket.id, username, room);

        socket.join(user.room);

    socket.emit('message', formatMessage('botname', "Welcome to chatbox"));

        // to boardcast when user connects
        socket.broadcast.to(user.room).emit('message', formatMessage('botname', `${user.username} has joined the chat`));

    })

    //listen chatmessage
    socket.on('chatmessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    });

    // when user disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage('botname', `A user has left the chat`));
    });
})

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
