const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../Middlewear/auth")
// const { isAuthenticated, isAdmin } = require("../Middlewear/auth")
const { createJobType , allJobType,createJob, jobById , allJobs,updateJob, showJobs} = require("../Controllers/JobTypeController");


router.post("/jobtype/create", isAuthenticated,isAdmin, createJobType);
router.post("/job/create", isAuthenticated, createJob);
router.put("/job/update/:job_id", isAuthenticated, isAdmin, updateJob);
router.get("/job/:id", isAuthenticated, jobById);
router.get("/jobs/alljobs", allJobs);
router.get("/alljobtype", isAuthenticated, allJobType);
module.exports = router;
