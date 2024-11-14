const User = require("../Models/UserModel");
const ErrorResponse=require("../Middlewear/error")
exports.allUsers = async (req, res, next) => {
  const pagesize = 10;
  const page = Number(req.query.parameter) || 1;

    const pageSize = 10;
    const pageNummber = (req.query.pageNumber) || 1;
    const count = await  User.find({}).estimatedDocumentCount();
  try{
    const users = await User.find().sort({ createdAt: -1 }).select('-password')
      .skip((pageNummber-1)*pagesize).limit(pageSize);
    res.status(200).json({
      succes: true,
      users,
      pageNummber,
      pages: Math.ceil(count / pageSize),count
    })

  }
  catch (err) {
    const errorResponse = {
      success: false,
      error: err.message || 'An error occurred'
    };
    return res.status(500).json(errorResponse); // Send simplified error response
  
  }
}

exports.singleUser = async (req, res, next) => { 
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, user });
    next();
    
  }
  catch (err) {
   return  next(err);
  }
}
exports.editUser = async (req, res, next) => { 
  try {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({ success: true, user });
   
    
  }
  catch (err) {
   return  next(err);
  }
}
exports.deleteUser = async (req, res, next) => { 
  try {
     await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message:"user deleted sucessfully" });
    next();
    
  }
  catch (err) {
   return  next(err);
  }
}