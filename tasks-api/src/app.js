const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { apiRouter } = require("./routes");
const { notFoundHandler, errorHandler } = require("./middleware/error.middleware");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/healthz", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Versioned API
app.use("/api/v1", apiRouter);

// Errors
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = { app };
