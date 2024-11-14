const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "first name should be mandatory"],
    maxlength: 32
  },
  lastName:{
    type: String,
    trim: true,
    required: [true, "Last name should be mandatory"],
    maxlength: 32
  },
  email:{
    type: String,
    trim: true,
    unique: true,
    required: [true, "e-mail is required"],
     match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    // minlength: [8, "password must have 8 characters"]
  },
  password: {
    type: String,
    trim: true,
    required:[true, "password is required"],
    minlength: [8, "password must have 8 characters"]
  },
  role: {

    type:Number,
    default: 0,
    
  }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.getJwtToken =  function () {

  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
}
module.exports= mongoose.model("Candidate",userSchema)