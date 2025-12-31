function notFoundHandler(req, res) {
  res.status(404).json({
    error: { code: "NOT_FOUND", message: `Route ${req.method} ${req.originalUrl} not found` }
  });
}

// Centralized error formatting
function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const code = err.code || (status >= 500 ? "INTERNAL_ERROR" : "BAD_REQUEST");
  const message = err.message || "Something went wrong";

  // Optional: include details for validation
  const payload = { error: { code, message } };
  if (err.details) payload.error.details = err.details;

  if (status >= 500) {
    console.error("Unhandled error:", err);
  }
  res.status(status).json(payload);
}

module.exports = { notFoundHandler, errorHandler };
