const { taskRepo } = require("../repositories/task.repo");

async function listTasks(userId) {
  return taskRepo.list(userId);
}

async function createTask(userId, { title }) {
  return taskRepo.create(userId, { title });
}

async function updateTask(userId, taskId, patch) {
  const updated = await taskRepo.update(userId, taskId, patch);
  if (!updated) throw { statusCode: 404, code: "NOT_FOUND", message: "Task not found" };
  return updated;
}

async function deleteTask(userId, taskId) {
  const ok = await taskRepo.remove(userId, taskId);
  if (!ok) throw { statusCode: 404, code: "NOT_FOUND", message: "Task not found" };
  return;
}

module.exports = { listTasks, createTask, updateTask, deleteTask };
