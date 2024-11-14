const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { ObjectId } = mongoose.Schema; 
// 

const JobSchema = new mongoose.Schema({

  jobTitle: {
    type: String,
    trim: true,
    required: [true, "Job title is required"]

  },
  salary: {
    type: String,
    trim: true,
    required: [true, "salary is required"]

  },
  description: {
    type: String,
    trim: true,
    required: [true, "job description is required"]
  },
  location: {
    type: String,
    trim: true,
    required: [true, "location is required"]

  },
  available: {
    type: Boolean,
    default: true
  },
  jobType: {
    type: ObjectId,
    ref: "JobType",
    required: true
  },
  user: {
    type: ObjectId,
    ref: "Candidate",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);

