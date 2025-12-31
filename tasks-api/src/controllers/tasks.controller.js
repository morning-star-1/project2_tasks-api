const tasksService = require("../services/tasks.service");

async function list(req, res, next) {
  try {
    const tasks = await tasksService.listTasks(req.user.sub);
    res.json({ tasks });
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const task = await tasksService.createTask(req.user.sub, req.body);
    res.status(201).json({ task });
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const task = await tasksService.updateTask(req.user.sub, req.params.id, req.body);
    res.json({ task });
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    await tasksService.deleteTask(req.user.sub, req.params.id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

module.exports = { list, create, update, remove };
