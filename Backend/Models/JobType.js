const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { ObjectId } = mongoose.Schema; 
// 

const JobTypeSchema = new mongoose.Schema({

  jobTypeName: {
    type: String,
    trim: true,
    required:[true, "Job category is required"]

  },
  
  
  user: {
    type: ObjectId,
    ref: "candidate",
    required: true
  }
})

module.exports = mongoose.model("JobType", JobTypeSchema);

