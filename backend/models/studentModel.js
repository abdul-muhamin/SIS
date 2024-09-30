const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    name:String,
    email:String,
    class:String,
    idNumber:String,
    fatherName:String,
    motherName:String,
    fatherPhoneNumber:String,
    motherPhoneNumber:String,
    address:String,
    stundentId:String
})

const StudentModel = mongoose.model("student" , StudentSchema)
module.exports = StudentModel