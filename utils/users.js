
const users=[];

// to join user to chat
 function joinUser(id,username,room){
    const user = {id, username, room};

    users.push(user);
    return user;
 }

 //to find the current user

 function getCurrentUser(id){
    return  users.find(user=>user.id===id);

 }

 module.exports={
    joinUser , 
    getCurrentUser 
 }