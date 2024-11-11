const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join room based on user ID from the client side
    socket.on("joinRoom", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room ${userId}`);
      
    });

    socket.on("sendNotification", (data) => {
      console.log("Received sendNotification event for user:", data);
      // Emit only to the room associated with toUserId
      io.to(data.toUserId).emit("receiveNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = setupSocket;
