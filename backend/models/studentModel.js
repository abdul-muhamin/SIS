const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    class:String,
    idNumber:String,
    fatherName:String,
    motherName:String,
    fatherPhoneNumber:String,
    motherPhoneNumber:String,
    address:String,
    stundentId:String,
    photoUrl: String
})

const StudentModel = mongoose.model("student" , StudentSchema)
module.exports = StudentModel