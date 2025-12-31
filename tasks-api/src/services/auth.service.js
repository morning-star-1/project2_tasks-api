const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const { userRepo } = require("../repositories/user.repo");

async function register(email, password) {
  const existing = await userRepo.findByEmail(email);
  if (existing) {
    throw { statusCode: 409, code: "EMAIL_EXISTS", message: "Email already registered" };
  }
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await userRepo.create({ email, passwordHash });
  return { id: user.id, email: user.email, createdAt: user.createdAt };
}

async function login(email, password) {
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw { statusCode: 401, code: "INVALID_CREDENTIALS", message: "Invalid email or password" };
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw { statusCode: 401, code: "INVALID_CREDENTIALS", message: "Invalid email or password" };
  }

  const token = jwt.sign({ sub: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });

  return { accessToken: token, tokenType: "Bearer", expiresIn: config.jwtExpiresIn };
}

async function me(userId) {
  const user = await userRepo.findById(userId);
  if (!user) throw { statusCode: 404, code: "NOT_FOUND", message: "User not found" };
  return { id: user.id, email: user.email, createdAt: user.createdAt };
}

module.exports = { register, login, me };
