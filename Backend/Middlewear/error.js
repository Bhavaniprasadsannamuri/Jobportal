const ErrorResponse = require("../Utils/ErrorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Resources not found ${err.value}`;
    error = new ErrorResponse(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate fieldvalue entered`;
      error = new ErrorResponse(message, 400);
  }
  if (err.name === "validationError") {
    const message = Object.values(err.errors).map((val => ' ' + val.message));
      error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    sucess: false,
    error:error.message || "server issue"
  })
  
}
module.exports = errorHandler;