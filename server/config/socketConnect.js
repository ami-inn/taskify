import { Server } from "socket.io";

export default function socketConnect(io, activeUsers){

    io.on('connection',(socket)=>{


        //add new user
    
        socket.on("new-user-add", (newUserId) => {
            // if user is not added previously
            if (!activeUsers.some((user) => user.userId === newUserId)) {
              activeUsers.push({ userId: newUserId, socketId: socket.id });
              console.log("New User Connected", activeUsers);
            }
    
            console.log('connected users',activeUsers);
            // send all active users to new user
            io.emit("get-users", activeUsers);
          });
    
          socket.on("disconnect", () => {
            // remove user from active users
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            console.log("User Disconnected", activeUsers);
            // send all active users to all users
            io.emit("get-users", activeUsers);
          });
    
    
          // send message to a specific user
      // send message to a specific user
      socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("Sending from socket to :", )
        console.log("Data: ", data)
        if (user) {
          io.to(user.socketId).emit("recieve-message", data);
        }
      });
    })
}
