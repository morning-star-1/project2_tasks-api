function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return next({
        statusCode: 400,
        code: "VALIDATION_ERROR",
        message: "Invalid request body",
        details: parsed.error.issues
      });
    }
    req.body = parsed.data;
    next();
  };
}

module.exports = { validateBody };
