const express = require("express");
const router = express.Router();
const { signup } = require("../controller/signupController");

router.post("/", signup);

module.exports = router;
