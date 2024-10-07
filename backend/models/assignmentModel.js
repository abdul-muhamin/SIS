const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
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

const AssignmentModel = mongoose.model("assignment" , AssignmentSchema)
module.exports = AssignmentModel
