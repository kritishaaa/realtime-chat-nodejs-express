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

 // leaves the chat

 function userLeave(id){
   const index = users.findIndex(user => user.id === id)
   if(index !== -1){
       return users.splice(index , 1 )[0];
      
   }
 }
 // get room users
 function getUserInRoom (room){
   return users.filter(user => user.room === room);
 }

 module.exports={
    joinUser , 
    getCurrentUser,
    userLeave,
    getUserInRoom


 }