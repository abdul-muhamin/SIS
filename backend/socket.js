const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      // methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {

    const userId = "brUOSt0kicagu7aJMO0lbvaWawB3";
  
    socket.join(userId);
  // console.log(socket)
    // and then later
      io.to(userId).emit("hi");
      // console.log(socket)
  });
  // io.on("connection", (socket) => {

  //   console.log("A user connected:", socket.id);

  //   // Join room based on user ID from the client side
  //   socket.on("joinRoom", (toUserId , fromUserId) => {
  //     socket.join(toUserId ,fromUserId );
  //     console.log(`User ${toUserId} joined room ${fromUserId}`);
  //   });
  //   socket.on("send_notification", ({ toUserId, message, fromUserId }) => {
  //     console.log(`Notification for user ${toUserId} from ${fromUserId}:`, message);
  //     io.to(toUserId).emit("receive_notification", { message, fromUserId })})

  //   //2-way immediate msgs --> From Server to Client usecase
  //   socket.on("chat_message", (arg) => {
  //     console.log("msg at server:", arg);
  //     io.emit("following_chat_message", "response from server");
  //   });




  //   socket.on("student_added", (arg) => {
  //     console.log("New Student is Added:", arg);
  //     io.emit("student_added_notification", "New Student is Added");
  //   });


  //   socket.on("student_attendance", (arg) => {
  //     console.log("Student Mark the Attendance:", arg);
  //     io.emit("student_attendance_enterance", "Student Mark the Attendance");
  //   });

  //   //From Server to Client usecase
  //   // socket.emit("server-chat_message", "this is a msg from server");

  //   //From Client to Server usecase
  //   socket.on("client-chat_message", (msg) => {
  //     console.log("client msg at server:", msg);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("A user disconnected:", socket.id);
  //   });
  // });

  return io;
};

module.exports = setupSocket;
