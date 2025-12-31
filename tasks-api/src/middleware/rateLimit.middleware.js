const rateLimit = require("express-rate-limit");

// Global rate limit per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: "RATE_LIMITED", message: "Too many requests, try later." } }
});

// Stricter limiter for auth endpoints (login brute force mitigation)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: "RATE_LIMITED", message: "Too many auth attempts, try later." } }
});

module.exports = { globalLimiter, authLimiter };
