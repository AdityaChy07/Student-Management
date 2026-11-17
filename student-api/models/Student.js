const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      minlength: [3, "Name must contain at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email"
      ]
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [17, "Age must be at least 17"],
      max: [30, "Age cannot exceed 30"]
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      enum: {
        values: ["CSE", "IT", "ECE", "Biotechnology"],
        message: "Invalid course"
      }
    },
    cgpa: {
      type: Number,
      required: [true, "CGPA is required"],
      min: [0, "CGPA cannot be less than 0"],
      max: [10, "CGPA cannot be greater than 10"]
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

