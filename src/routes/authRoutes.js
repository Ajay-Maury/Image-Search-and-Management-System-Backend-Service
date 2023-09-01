const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .post("/user/register", authController.register)
  .post("/user/login", authController.login);

module.exports = router;
