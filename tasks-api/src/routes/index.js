const express = require("express");
const { globalLimiter } = require("../middleware/rateLimit.middleware");

const authRoutes = require("./auth.routes");
const tasksRoutes = require("./tasks.routes");

const apiRouter = express.Router();
apiRouter.use(globalLimiter);

apiRouter.use("/auth", authRoutes);
apiRouter.use("/tasks", tasksRoutes);

module.exports = { apiRouter };
