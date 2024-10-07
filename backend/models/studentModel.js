// const mongoose = require("mongoose")

// const StudentSchema = new mongoose.Schema({
//     fullName:String,
//     email:String,
//     class:String,
//     idNumber:String,
//     fatherName:String,
//     motherName:String,
//     fatherPhoneNumber:String,
//     motherPhoneNumber:String,
//     address:String,
//     studentId:String,
//     photo: String,
//     status:String
// })

// const StudentModel = mongoose.model("student" , StudentSchema)
// module.exports = StudentModel


const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    class: String,
    idNumber: String,
    fatherName: String,
    motherName: String,
    fatherPhoneNumber: String,
    motherPhoneNumber: String,
    address: String,
    studentId: String,
    photo: String, // Photo file name
    status: String
});

const StudentModel = mongoose.model("student" , StudentSchema)
module.exports = StudentModel
