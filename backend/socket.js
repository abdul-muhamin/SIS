const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      // methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join room based on user ID from the client side
    // socket.on("joinRoom", (userId) => {
    //   socket.join(userId);
    //   console.log(`User ${userId} joined room ${userId}`);
    // });

    // socket.on("sendNotification", (data) => {
    //   console.log("Received sendNotification event for user:", data);
    //   // Emit only to the room associated with toUserId
    //   io.to(data.toUserId).emit("receiveNotification", data);
    // });

    ////2-way immediate msgs --> From Server to Client usecase
    // socket.on("chat_message", (arg) => {
    //   console.log("msg at server:", arg);
    //   io.emit("following_chat_message", "response from server");
    // });

    ////From Server to Client usecase
    // socket.emit("server-chat_message", "this is a msg from server");

    ////From Client to Server usecase
    socket.on("client-chat_message", (msg) => {
      console.log("client msg at server:", msg);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = setupSocket;
