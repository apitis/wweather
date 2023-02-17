const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  location: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export const TaskModel = mongoose.model("Task", taskSchema);


