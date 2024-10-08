const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    courseName: String,
    mid: String,
    final: String,
    // grade: String,

});

const GradeModel = mongoose.model("grade" , GradeSchema)
module.exports = GradeModel
