const express = require("express");
const router = express.Router();
const { handleCourseRegistration } = require("../controllers/courseController");
const { confirmationRateLimit } = require("../middleware/rateLimiter");

router.post("/", confirmationRateLimit, handleCourseRegistration);

module.exports = router;
