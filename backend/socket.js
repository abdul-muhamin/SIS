// const { Server } = require("socket.io");

// const setupSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//     },
//   });


//   // io.on("connection", (socket) => {

//   //   console.log("A user connected:", socket.id);


//   //   socket.on("join_room", (userId) => {
//   //     socket.join(userId);
//   //     console.log(`User with ID ${userId} joined their room.`);
//   //   });

//   //   socket.on("send_notification", ({ toUserId, message, fromUserId }) => {
//   //     console.log(`Notification for user ${toUserId} from ${fromUserId}:`, message);
//   //     socket.to(toUserId).emit("receive_notification", { message, fromUserId })})

//   //   //2-way immediate msgs --> From Server to Client usecase
//   //   socket.on("chat_message", (arg) => {
//   //     console.log("msg at server:", arg);
//   //     io.emit("following_chat_message", "response from server");
//   //   });




//   //   socket.on("student_added", (arg) => {
//   //     console.log("New Student is Added:", arg);
//   //     io.emit("student_added_notification", "New Student is Added");
//   //   });


//   //   socket.on("student_attendance", (arg) => {
//   //     console.log("Student Mark the Attendance:", arg);
//   //     io.emit("student_attendance_enterance", "Student Mark the Attendance");
//   //   });

//   //   //From Server to Client usecase
//   //   // socket.emit("server-chat_message", "this is a msg from server");

//   //   //From Client to Server usecase
//   //   socket.on("client-chat_message", (msg) => {
//   //     console.log("client msg at server:", msg);
//   //   });

//   //   socket.on("disconnect", () => {
//   //     console.log("A user disconnected:", socket.id);
//   //   });
//   // });

//   io.on("connection", (socket) => {
//     console.log("User Connected", socket.id);
  
//     socket.on("message", ({ room, message }) => {
//       console.log({ room, message });
//       socket.to(room).emit("receive-message", message);
//     });
  
//     socket.on("join-room", (roomName) => {
//       socket.join("roomName");
//       console.log(`User joined room ${room}`);
//     });
  
//     socket.on("disconnect", () => {
//       console.log("User Disconnected", socket.id);
//     });
//   });

//   return io;
// };

// module.exports = setupSocket;

const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Or your deployed frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);
  socket.emit("me", socket.id);
  console.log("Sent socket ID to client:", socket.id);

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", ({ signal, to }) => {
    io.to(to).emit("callAccepted", signal);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

    // Notification functionality
    // socket.on("join_room", (userId) => {
    //   socket.join(userId);
    //   console.log(`User with ID ${userId} joined their room.`);
    // });

    // socket.on("send_notification", ({ toUserId, message, fromUserId }) => {
    //   console.log(
    //     `Notification for user ${toUserId} from ${fromUserId}:`,
    //     message
    //   );
    //   socket.to(toUserId).emit("receive_notification", {
    //     message,
    //     fromUserId,
    //   });
    // });

    // // Chat messaging functionality
    // socket.on("message", ({ room, message }) => {
    //   console.log(`Message to room ${room}:`, message);
    //   socket.to(room).emit("receive-message", message);
    // });

    // socket.on("join-room", (roomName) => {
    //   socket.join(roomName);
    //   console.log(`User joined room: ${roomName}`);
    // });

    // // Student management functionality
    // socket.on("student_added", (arg) => {
    //   console.log("New Student Added:", arg);
    //   io.emit("student_added_notification", "New Student is Added");
    // });

    // socket.on("student_attendance", (arg) => {
    //   console.log("Student Marked Attendance:", arg);
    //   io.emit("student_attendance_enterance", "Student Marked Attendance");
    // });
  });

  return io;
};

module.exports = setupSocket;
