const express = require("express");
const router = express.Router();

const { allUsers ,singleUser,editUser ,deleteUser} = require("../Controllers/UserController")
const { userProfile} = require("../Controllers/AuthController")
// const {  isAdmin } = require("../Middlewear/auth")
// const{isAdmin}=require("../Middlewear/auth")
const { isAuthenticated, isAdmin } = require("../Middlewear/auth")
router.get("/allUsers", isAuthenticated, isAdmin, allUsers);
router.get("/user/:id", isAuthenticated, singleUser);
router.put("/user/edit/:id", isAuthenticated,  editUser);
router.delete("/user/delete/:id",isAuthenticated,isAdmin, deleteUser);
module.exports = router;