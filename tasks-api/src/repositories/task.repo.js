const crypto = require("crypto");

class InMemoryTaskRepo {
  constructor() {
    this.tasksByUserId = new Map(); // userId -> Task[]
  }

  _list(userId) {
    if (!this.tasksByUserId.has(userId)) this.tasksByUserId.set(userId, []);
    return this.tasksByUserId.get(userId);
  }

  async list(userId) {
    return this._list(userId);
  }

  async create(userId, { title }) {
    const tasks = this._list(userId);
    const task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    tasks.push(task);
    return task;
  }

  async update(userId, taskId, patch) {
    const tasks = this._list(userId);
    const idx = tasks.findIndex(t => t.id === taskId);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...patch };
    return tasks[idx];
  }

  async remove(userId, taskId) {
    const tasks = this._list(userId);
    const idx = tasks.findIndex(t => t.id === taskId);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    return true;
  }
}

const taskRepo = new InMemoryTaskRepo();
module.exports = { taskRepo };
