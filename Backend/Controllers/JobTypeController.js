const jobtype = require("../Models/JobType")
const job = require("../Models/JobModel")
const ErrorResponse = require("../Middlewear/error")
const candidate = require("../Models/UserModel")


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
    res.status(200).json({ success: true, JobT });
        
  }
  catch (err) {
     console.error(err);
    next(err);
  }
}

exports.allJobs = async (req, res, next) => {
  const pageSize = 2;
  const pageNumber = Number(req.query.pageNumber) || 1;
   const keyword = req.query.keyword ? {
    jobTitle: {
      $regex: req.query.keyword,
      $options: "i"
    }
   } : {}
  
  //filter jobs  by category
  let ids = [];
  const jobTypeCategory = await jobtype.find({}, { _id: 1 ,jobTypeName:1});
  jobTypeCategory.forEach(cat => {
    ids.push(cat);
  })
  let cat = req.query.cat;
  let catergoryType = cat !== "" ? cat : ids;
  const count = await job.find({...keyword, jobType:catergoryType }).countDocuments();
 
  try {
    const JobT = await job.find({...keyword,jobType:catergoryType }).skip(pageSize*(pageNumber-1)).limit(pageSize);
    res.status(200).json({
      success: true,
      JobT,
      pageNumber,
      pages: Math.ceil(count / pageSize),
      count,
      
    });
          

        
  }
  catch (err) {
     console.error(err);
    next(err);
  }
}

// exports.showJobs = async (req, res, next) => {
  

//     const pageSize = 5;
//     const pageNummber = (req.query.pageNumber) || 1;
//     const count = await  job.find({}).estimatedDocumentCount();

//   try {
//     const totalJobs = await job.find();
//     res.status(200).json({
//       success: true,
//       totalJobs,
//       pageNummber,
//       pages: Math.ceil(count / pageSize),
//       count
      
//     });
        
//   }
//   catch (err) {
//      console.error(err);
//     next(err);
//   }
// }