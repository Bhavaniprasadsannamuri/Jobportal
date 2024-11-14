const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
var cors = require("cors");
const errorHandler=require("./Middlewear/error")
//import routes
app.use(express.json());
app.use(cookieParser());
// Middleware to parse URL-encoded bodies (if needed)
// This is useful if you're expecting form submissions
app.use(express.urlencoded({ extended: true }));
const authRoute = require("./Routes/authRoute");
const userRoute = require("./Routes/userRoute");
const jobRoute = require("./Routes/JobRoute");

//middlewear
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb",extended:true}));
app.use(cookieParser());
app.use(cors());

//database connection
mongoose.connect(process.env.DATABASE , {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // // useCreateIndex: true,
  // useFindAndModify: false
}).then(() => {
  console.log("database running sucessfully");
}).catch((err) => console.log(err));


app.use("/", authRoute);
app.use("/", userRoute);
app.use("/", jobRoute);
//error middlewear
app.use(errorHandler);
//port
// app.get("/", (req, res) => {
//   res.send("nodeJS running ");
// })
const port = process.env.PORT || 9001
app.listen(port, () => {
  console.log("server running ");
});