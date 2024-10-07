

// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const router = require("./routes/stundentRoute")
// const path = require("path")
// const multer = require("multer")  



// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// app.listen(3001 , ()=>{
//     console.log("Server is running")
// })

// mongoose.connect("mongodb+srv://rehany7xa:y7xapjwpq@cluster0.5epjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// .then(()=>console.log("connected to mongoDB...")
// )
// .catch((err)=>console.log(err))

// // Item API routes
// app.use('/api/students', router);


// // Basic route
// app.get('/', (req, res) => {
//   res.send('Welcome to the CRUD API');
// });


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');  // Store files in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));  // Rename the file to avoid name conflicts
//   }
// });

// const upload = multer({ storage: storage });

// app.use('/api/students',router );

// app.post('/upload', upload.single('file'), (req, res) => {
//   res.send('File uploaded successfully!');
// });

// // // Serve the uploaded files statically
// // app.use('/uploads', express.static('uploads'));

// // // Start the server
// // app.listen(3001, () => {
// //   console.log('Server started on port 5000');
// // });



// // const upload = multer({dest:"uploads/"})
// // app.post("./upload",upload.single('photo'), (req , res)=>{
// //   console.log(req.body);
// //   console.log(req.file);
  
// // })



// index 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/stundentRoute");
const path = require("path");

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

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Student CRUD API');
});
