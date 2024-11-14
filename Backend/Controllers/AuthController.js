const User = require("../Models/UserModel")
const ErrorResponse = require("../Utils/ErrorResponse");
exports.signup =  async (req, res,next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("email already exists", 400));
  }
  try {
    const createuser = await User.create(req.body);
    res.status(201).json({
      success: true,
      singupstatus:true,
      createuser
      
    })
  }
  catch (err) {
    next(err);
  }
}
exports.signin = async (req, res, next) => {
  try {
        const { email, password } = req.body;
        if (!email) {
          return next(new ErrorResponse("please add an email", 403));
        }
        if (!password) {
          return next(new ErrorResponse("please enter password", 403));
        }
        const userexists = await User.findOne({ email });
        if (!userexists) {
          return next(new ErrorResponse("invalid login credentials", 400));
        }
        const isPasswordMatch = await userexists.comparePassword(password);
        if (!isPasswordMatch) {
          return next(new ErrorResponse("invalid login credentials", 400));
        }
    sendTokenResponse(userexists, 200, res);
  }

  catch (err) {
      next(err);
  }
}
exports.logout = (req, res, next) => {
  res.clearCookie('webtoken');
  res.status(200).json({ success: true, message: "logged out" });
}
const sendTokenResponse = async (userExist, codeStatus, res) => {
  const webtoken = await userExist.getJwtToken();
  res.status(codeStatus).cookie('webtoken', webtoken, { maxAge: 60 * 60 * 1000,httpOnly:true }).json({success:true,webtoken,userExist});
}

exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  res.status(200).json({ success: true, user });

}