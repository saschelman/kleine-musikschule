const rateLimit = require("express-rate-limit");

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
});

const confirmationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Zu viele Bestätigungsanfragen. Bitte später erneut versuchen.",
  },
});

module.exports = {
  contactRateLimit,
  confirmationRateLimit,
};
