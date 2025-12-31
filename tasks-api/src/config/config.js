const dotenv = require("dotenv");
dotenv.config();

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

const config = {
  port: Number(process.env.PORT || 3000),
  env: process.env.NODE_ENV || "development",
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: "1h"
};

module.exports = { config };
