const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    title: String,
    assignment: String,

});

const AssignmentModel = mongoose.model("assignment" , AssignmentSchema)
module.exports = AssignmentModel
