const jobtype = require("../Models/JobType")
const job = require("../Models/JobModel")
const ErrorResponse = require("../Middlewear/error")
const candidate = require("../Models/UserModel")
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

exports.createJobType = async (req, res, next) => {
  try {
    const JobT = await jobtype.create({
      jobTypeName: req.body.jobTypeName,
      user: req.user.id
    });
    res.status(201).json({ success: true, JobT });
          

        
  }
  catch (err) {
    next(err);
   }
}
exports.allJobType = async (req, res, next) => {
  try {
    const JobT = await jobtype.find();
    console.log(JobT);
    res.status(200).json({ success: true, JobT });
          

        
  }
  catch (err) {
    next(err);
   }
}
exports.createJob = async (req, res, next) => {
  try {
    const JobT = await job.create({
      jobTitle: req.body.jobTitle,
      salary: req.body.salary,
      description: req.body.description,
      location: req.body.location,
      available: req.body.available,
      user: req.user.id,
      jobType: req.body.jobType
    });
    res.status(201).json({ success: true, JobT });
          

        
  }
  catch (err) {
    next(err);
  }
  
}
exports.jobById = async (req, res, next) => {
  try {
    const JobT = await job.findById(req.params.id);
    res.status(200).json({ success: true, JobT });
          

        
  }
  catch (err) {
    next(err);
  }
}

exports.updateJob = async (req, res, next) => {
  try {
    const JobT = await job.findByIdAndUpdate(req.params.job_id, req.body, {new:true}).populate("jobType","jobTypeName").populate("user", "firstName lastName");
    if (JobT.user) {
      JobT.user = `${JobT.user.firstName} ${JobT.user.lastName}`;  // Combine the first and last name into a single string
    }
    console.error( "updateduser", JobT.user);
    res.status(200).json({ success: true, JobT });
        
  }
  catch (err) {
     console.error(err);
    next(err);
  }
}

exports.allJobs = async (req, res, next) => {
   console.log("going to start filter location");

  const pageSize = 2;
  const pageNumber = Number(req.query.pageNumber) || 1;
   console.log(req.query.keyword);
   const keyword = req.query.keyword ? {
    jobTitle: {
      $regex: req.query.keyword,
      $options: "i"
    }
   } : {}
  
  //filter jobs  by category
  let ids = [];
  const jobTypeCategory = await jobtype.find({}, { _id: 1 });
  jobTypeCategory.forEach((category) => {
    console.log("id  " + category._id);
    ids.push(category._id);
  })
  console.log("ids "+ids);
  
  let category = req.query.cat;
  let jobtypecategory  = category !== "" ? category : ids;
//   let categoryType;
// if (category && mongoose.Types.ObjectId.isValid(category)) {
//   // If the category is valid, create a new ObjectId
//   categoryType = new mongoose.Types.ObjectId(category);
//   console.log("Valid category type:", categoryType);
// } else {
//   // If the category is invalid or not provided, fallback to all ids
//   categoryType = ids;
//   console.log("Invalid category or no category provided. Using all ids:", categoryType);
// }
  //filter by location
  let locations = [];
  const jobsByLocation = await job.find({}, { location: 1 });
  jobsByLocation.forEach((job) => locations.push(job.location));
  let setLocations = [...new Set(locations)];
  console.log("setLocations" + setLocations);
  let location = req.query.location;
  console.log("location LINE 119",req.query.location);
  let setUniqueLocation = location  ? location : setLocations;
  console.log("filterLocation" + setLocations);
  console.log("setUniqueLocation" + setUniqueLocation);
  
  //estimating total jobs 
  console.log("jobtypecategory" + jobtypecategory);
  const count = await job.find({...keyword, jobType : jobtypecategory ,location:setUniqueLocation}).countDocuments();
 
  try {
    const filteredJobs = await job.find({...keyword, jobType: jobtypecategory,location:setUniqueLocation }).populate("jobType","jobTypeName").skip(pageSize*(pageNumber-1)).limit(pageSize);
    console.log("filteredJobs",filteredJobs);
    const modifiedJobs = filteredJobs.map(job => {
      
      return ({
        ...job._doc, // Spread the other fields
        jobType:  job.jobType ? job.jobType.jobTypeName : null  // Replace jobType object with jobTypeName
    })});
    
    console.log("pages",Math.ceil(count / pageSize),)
    res.status(200).json({
      success: true,
     "modifiedJobs" : modifiedJobs,
      pageNumber,
      pages: Math.ceil(count / pageSize),
      count,
      modifiedJobs,
      jobtypecategory,
      // setUniqueLocation
      setLocations
    });
          

        
  }
  catch (err) {
     console.error(err);
    next(err);
  }
}

exports.updateJobTypeById = async (req, res, next) => {

  try {
    const updatedJobType = await jobtype.findByIdAndUpdate(req.params.typeId, req.body, { new: true });
    return res.status(200).json({
      success:true,
        updatedJobType
      })
  }
  catch (err) {
    next(err);
  }
}
exports.deleteJobTypeById = async (req, res, next) => {

  try {
    const isdeleted = await jobtype.findByIdAndDelete(req.params.typeId);
    return res.status(200).json({
      success:true,
      message: "deleted successfully",
        
      })
  }
  catch (err) {
    next(err);
  }
}
