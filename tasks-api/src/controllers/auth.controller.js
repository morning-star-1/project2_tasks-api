const authService = require("../services/auth.service");

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body.email, req.body.password);
    res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
}

async function login(req, res, next) {
  try {
    const token = await authService.login(req.body.email, req.body.password);
    res.json(token);
  } catch (e) {
    next(e);
  }
}

async function me(req, res, next) {
  try {
    const user = await authService.me(req.user.sub);
    res.json({ user });
  } catch (e) {
    next(e);
  }
}

module.exports = { register, login, me };
