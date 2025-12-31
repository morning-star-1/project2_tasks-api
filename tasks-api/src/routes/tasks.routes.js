const express = require("express");
const { z } = require("zod");

const { authRequired } = require("../middleware/auth.middleware");
const { validateBody } = require("../middleware/validate.middleware");
const tasksController = require("../controllers/tasks.controller");

const router = express.Router();
router.use(authRequired);

const CreateTaskSchema = z.object({
  title: z.string().min(1).max(200)
});

const UpdateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  completed: z.boolean().optional()
}).refine(v => Object.keys(v).length > 0, { message: "Provide at least one field to update" });

/**
 * @openapi
 * /api/v1/tasks:
 *   get:
 *     summary: List tasks
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 */
router.get("/", tasksController.list);

/**
 * @openapi
 * /api/v1/tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string, example: "Ship the API" }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", validateBody(CreateTaskSchema), tasksController.create);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               completed: { type: boolean }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.patch("/:id", validateBody(UpdateTaskSchema), tasksController.update);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Deleted }
 *       404: { description: Not found }
 */
router.delete("/:id", tasksController.remove);

module.exports = router;
