// index 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/stundentRoute");
const path = require("path");
const teacherRoutes = require("./routes/teacherRoute")
const assignmentRoutes = require("./routes/assignmentRoute")
const gradeRoutes = require("./routes/gradeRoute")
const userRoutes = require("./routes/userRoute")
const userDetailsRoutes = require('./routes/userDetailsRoute');
const studnetAttendenceRoute = require('./routes/studentAttendenceRoute')
const staffAttendenceRoute = require('./routes/staffAttendenceRoute')
const rolesRoute = require('./routes/roleRoute')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://rehany7xa:y7xapjwpq@cluster0.5epjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

// Routes for CRUD API
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/user', userRoutes);
app.use('/api',userDetailsRoutes );
app.use('/api',studnetAttendenceRoute );
app.use('/api',staffAttendenceRoute );
app.use('/api/roles',rolesRoute );

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Student CRUD API');
});
