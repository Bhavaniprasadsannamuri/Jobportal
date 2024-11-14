const express = require("express");
const router = express.Router();
const {signup }= require("../Controllers/AuthController")
const {signin }= require("../Controllers/AuthController")
const { logout } = require("../Controllers/AuthController")
const { userProfile } = require("../Controllers/AuthController")
const {isAuthenticated}=require("../Middlewear/auth")
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);

router.get("/me",isAuthenticated, userProfile);
module.exports = router;