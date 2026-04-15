const express = require("express");
const router = express.Router();
const {registerUser,loginUser, verifyOtp} = require("../controllers/authController")

router.post("/register", registerUser);
router.post("/loginUser",loginUser);
router.post("/verifyOtp", verifyOtp);

module.exports = router;