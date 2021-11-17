const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  searchable: {
    type: String,
    required: true,
    trim: true,
    index: "text",
  },
});
module.exports = Task;
