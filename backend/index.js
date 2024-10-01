// const { default: mongoose } = require("mongoose")

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const router = require("./routes/stundentRoute")

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3001 , ()=>{
    console.log("Server is running")
})

mongoose.connect("mongodb+srv://rehany7xa:y7xapjwpq@cluster0.5epjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("connected to mongoDB...")
)
.catch((err)=>console.log(err))

// Item API routes
app.use('/api/students', router);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the CRUD API');
});