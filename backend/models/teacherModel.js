const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
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

const TeacherModel = mongoose.model("teacher" , TeacherSchema)
module.exports = TeacherModel
