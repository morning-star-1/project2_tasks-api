const express = require("express");
const { z } = require("zod");

const { authLimiter } = require("../middleware/rateLimit.middleware");
const { validateBody } = require("../middleware/validate.middleware");
const { authRequired } = require("../middleware/auth.middleware");

const authController = require("../controllers/auth.controller");

const router = express.Router();

const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72)
});

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "dev@example.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       201: { description: Created }
 */
router.post("/register", authLimiter, validateBody(AuthSchema), authController.register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login and get a JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "dev@example.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200: { description: OK }
 */
router.post("/login", authLimiter, validateBody(AuthSchema), authController.login);

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 *       401: { description: Unauthorized }
 */
router.get("/me", authRequired, authController.me);

module.exports = router;
