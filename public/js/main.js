const chatForm = document.getElementById('chat-form');
const chatmessage = document.querySelector('.chat-messages');

// get username and room from url
 const {username, room}= Qs.parse(location.search, {
    ignoreQueryPrefix:true,

 });
 console.log(username, room);

const socket = io();

// join chatroom with username and room
socket.emit("joinRoom",{username , room});


socket.on('message', message => {
    console.log(message);
    outputMessage(message);


    // scroll down 

    chatmessage.scrollTop = chatmessage.scrollHeight;
})

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    //get message
    const msg = e.target.elements.msg.value;

    // emit to server
    socket.emit("chatmessage", msg);

    // clear the input 

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

})

//output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
     <p class="text">
         ${message.text}
     </p>`

    document.querySelector('.chat-messages').appendChild(div);
}