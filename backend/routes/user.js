const express = require("express");
const router = express.Router();
const UserController = require("../contollers/user");

router.post("/signup",UserController.CreateUSer);
router.post("/login",UserController.UserLogin);

module.exports = router;
