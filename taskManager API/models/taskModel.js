const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'must provide name'],
      trim: true,
      maxlength: [20, 'Name canot be equal to 20 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  }
  //   { timestamps: true }
);
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
