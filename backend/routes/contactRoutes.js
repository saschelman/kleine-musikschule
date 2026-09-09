const express = require("express");
const router = express.Router();
const { handleContact, handleCustomerConfirmation } = require("../controllers/contactController");
const { contactRateLimit, confirmationRateLimit } = require("../middleware/rateLimiter");

router.post("/", contactRateLimit, handleContact);
router.post("/customer-confirmation", confirmationRateLimit, handleCustomerConfirmation);

module.exports = router;
