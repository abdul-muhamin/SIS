const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
// const setupSocket = require("./socket"); 

// Routes imports
const studentRoutes = require("./routes/stundentRoute");
const teacherRoutes = require("./routes/teacherRoute");
const assignmentRoutes = require("./routes/assignmentRoute");
const gradeRoutes = require("./routes/gradeRoute");
const userRoutes = require("./routes/userRoute");
const userDetailsRoutes = require("./routes/userDetailsRoute");
const studentAttendanceRoute = require("./routes/studentAttendenceRoute");
const staffAttendanceRoute = require("./routes/staffAttendenceRoute");
const rolesRoute = require("./routes/roleRoute");
const scheduleRoute = require("./routes/scheduleRoute");
const notificationRoute = require("./routes/notificationRoute");
const chatbotRoute = require("./routes/appointmentRoute"); // Chatbot route

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose
  .connect('mongodb+srv://rehany7xa:y7xapjwpq@cluster0.5epjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route setup
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/user", userRoutes);
app.use("/api", userDetailsRoutes);
app.use("/api", studentAttendanceRoute);
app.use("/api", staffAttendanceRoute);
app.use("/api/roles", rolesRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api", notificationRoute);
app.use("/api", chatbotRoute);

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Student CRUD API");
});

// const server = http.createServer(app);

// const io = setupSocket(server);
// app.set("socketio", io);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
