// const mongoose = require('mongoose');

// const attendanceSchema = new mongoose.Schema({
//   studentId: {
//     type: String,
//     // required: true,
//   },
//   attendances: [
//     {
//       // id: {
//       //   type: mongoose.Schema.Types.ObjectId, // This can be generated automatically
//       //   default: () => new mongoose.Types.ObjectId(), // Automatically generate an ObjectId
//       // },
//       date: {
//         type: String,
//         // required: true, // Stored as 'YYYY-MM-DD'
//       },
//       clockIn: {
//         type: String,
//         default: '', // Store as time (HH:mm format or string)
//       },
//       clockOut: {
//         type: String,
//         default: '',
//       },
//       leaveType: {
//         type: String,
//         default: '',
//       },
//       isArchived: {
//         type: Boolean,
//         default: false, // Default value for isArchived
//       },
//     },
//   ],
// }, { collection: 'student_attendance', _id: false }); // Specify the collection name here

// const Attendance = mongoose.model('Attendance', attendanceSchema);

// module.exports = Attendance;

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    // required: true,
  },
  attendances: [
    {
    //   id: {
    //     type: mongoose.Schema.Types.ObjectId, // This can be generated automatically
    //     default: () => new mongoose.Types.ObjectId(), // Automatically generate an ObjectId
    //   },
      date: {
        type: String,
        // required: true, // Stored as 'YYYY-MM-DD'
      },
      clockIn: {
        type: String,
        default: '', // Store as time (HH:mm format or string)
      },
      clockOut: {
        type: String,
        default: '',
      },
      leaveType: {
        type: String,
        default: '',
      },
      isArchived: {
        type: Boolean,
        default: false, // Default value for isArchived
      },
    },
  ],
}, { collection: 'student_attendance' }); 

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
