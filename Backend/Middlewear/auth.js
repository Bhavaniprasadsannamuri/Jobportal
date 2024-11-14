const jwt = require("jsonwebtoken")
const ErrorResponse = require('../Utils/ErrorResponse');
const User = require('../Models/UserModel');
exports.isAuthenticated = async (req, res, next) => { 
  console.log(req.cookies);
  const { webtoken } = req.cookies;
  if (!webtoken) {
    return next(new ErrorResponse("not authorized to access to this route", 400));
  }
  try {
    const decoded = jwt.verify(webtoken, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    console.log(req.user);
    if (!req.user) {
      return next(new ErrorResponse("User not found", 404));
    }
    next();
  }
  catch (err) {
    return next(new ErrorResponse("not authroised to access this role", 401));
    
  }



}
exports.isAdmin = (req, res, next) => {
  console.log(req.user.role);
  if (!req.user.role === 0) {
    return next(new ErrorResponse("Access denied you must be a admin", 401));
  }
  next();
  
}