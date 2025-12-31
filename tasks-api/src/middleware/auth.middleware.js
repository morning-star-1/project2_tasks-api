const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return next({ statusCode: 401, code: "UNAUTHORIZED", message: "Missing Bearer token" });
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload; // { sub, email }
    return next();
  } catch (e) {
    return next({ statusCode: 401, code: "UNAUTHORIZED", message: "Invalid or expired token" });
  }
}

module.exports = { authRequired };
